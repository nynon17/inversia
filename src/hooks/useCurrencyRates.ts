import { useState, useEffect } from 'react';

interface Rates {
  EUR: number;
  GBP: number;
}

const CACHE_KEY = 'currency_rates';
const CACHE_DURATION = 1000 * 60 * 60; // 1 godzina

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      // Sprawdź cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { rates: cachedRates, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setRates(cachedRates);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          'https://api.exchangerate.host/latest?base=PLN&symbols=EUR,GBP'
        );
        const data = await response.json();
        
        if (data.success && data.rates) {
          const newRates = {
            EUR: data.rates.EUR,
            GBP: data.rates.GBP,
          };
          setRates(newRates);
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            rates: newRates,
            timestamp: Date.now(),
          }));
        } else {
          // Fallback rates jeśli API nie działa
          setRates({ EUR: 0.23, GBP: 0.19 });
        }
      } catch (error) {
        console.error('Error fetching rates:', error);
        // Fallback rates
        setRates({ EUR: 0.23, GBP: 0.19 });
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertPrice = (plnAmount: number, currency: 'EUR' | 'GBP'): number => {
    if (!rates) return 0;
    return Math.round(plnAmount * rates[currency]);
  };

  return { rates, loading, convertPrice };
};

// Funkcja do formatowania ceny z przeliczeniem
export const formatPriceWithConversion = (
  plnAmount: number | null,
  unit: string,
  lang: string,
  convertPrice: (amount: number, currency: 'EUR' | 'GBP') => number
): string => {
  if (plnAmount === null) {
    // Cena indywidualna
    if (lang === 'pl') return 'Wycena indywidualna';
    if (lang === 'de') return 'Individuelle Preisgestaltung';
    return 'Individual quote';
  }

  const unitText = unit === 'm2' 
    ? '/ m²' 
    : unit === 'hour' 
      ? (lang === 'pl' ? '/ godzina' : lang === 'de' ? '/ Stunde' : '/ hour')
      : '';

  if (lang === 'pl') {
    return `${plnAmount} zł ${unitText}`;
  } else if (lang === 'de') {
    const eurAmount = convertPrice(plnAmount, 'EUR');
    return `${plnAmount} PLN ≈ ${eurAmount}€ ${unitText}`;
  } else {
    // EN - GBP
    const gbpAmount = convertPrice(plnAmount, 'GBP');
    return `${plnAmount} PLN ≈ £${gbpAmount} GBP ${unitText}`;
  }
};
