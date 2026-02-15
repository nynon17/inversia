import { Link } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface Review {
  name: string;
  date: string;
  content: string;
  type: 'positive' | 'negative';
}

const reviews: Review[] = [
  {
    name: 'Katarzyna Strąk',
    date: '18 stycznia 2026',
    content: 'Szczerze polecam współpracę z panią Pamelą. Bezproblemowy kontakt, pełna dostępność i otwartość dla klienta, bardzo szybki czas realizacji projektu. Pani Pamela wzięła pod uwagę wszystkie moje wymagania, doradzała z rozwiązaniami i wykazuje się dużą wiedzą. Nie było problemu z wprowadzeniem zmian w pierwotnej wizualizacji dzięki czemu udało nam się uzyskać piękny i w pełni zadowalający efekt. Polecam 👌',
    type: 'positive',
  },
  {
    name: 'Aleksandra Włodarczyk',
    date: '6 września 2025',
    content: 'Bardzo polecam. Pamela doradzi i zrobi co tylko chcemy. Wiele razy zmieniała wizualizacje – za co jestem bardzo wdzięczna, dzięki czemu uzyskaliśmy właśnie to co chcieliśmy.',
    type: 'positive',
  },
  {
    name: 'Joanna Napierała',
    date: '2 września 2025',
    content: 'Bardzo udana współpraca. Projekt został przygotowany z dbałością o szczegóły i dopasowany do naszych potrzeb. Doceniam otwartość na sugestie oraz praktyczne podejście. Polecam osobom, które szukają profesjonalnego i życzliwego wsparcia przy urządzaniu wnętrza.',
    type: 'positive',
  },
  {
    name: 'Katarzyna Jaroszewska',
    date: '2 września 2025',
    content: 'Chciałam bardzo podziękować Pamelii za współpracę odnośnie za zaprojektowania wnętrz 🙂. Pełen profesjonalizm, mnóstwo pomysłów, nieziemska cierpliwość i stały kontakt. Polecam serdecznie 🙂',
    type: 'positive',
  },
  {
    name: 'Tomek Stefaniak',
    date: '1 sierpnia 2025',
    content: 'Świetna współpraca, przebiegająca nawet w markecie pod kątem doboru kolorów. Jedyne co było na czas podczas całego remontu – to odpowiedzi Pameli! Polecam i dziękuję',
    type: 'positive',
  },
  {
    name: 'Paulina Piotrowska',
    date: '4 maja 2025',
    content: 'Pamela jest osobą, która z każdego wnętrza jest w stanie zrobić coś niesamowitego. W jej pracy widać pasję i ogromne zaangażowanie. Ma niespotykane wyczucie estetyki, widzi szczegóły, na które sama nigdy bym nie zwróciła uwagi. Słucha swojego klienta i widzi głębiej, trafia w gust i zawsze dużo proponuje od siebie. Każdemu, kto szuka czegoś wyjątkowego, naprawdę szczerze polecam. Współpraca z Pamelą jest czystą przyjemnością ❤️',
    type: 'positive',
  },
  {
    name: 'Emilia Lisowska',
    date: '23 kwietnia 2025',
    content: 'Pamela to przesympatyczna osoba, która z wielką kreatywnością, otwartą głową i wyczuciem stylu podchodzi do tworzenia projektów. Ujęła mnie jej szczera chęć zrozumienia moich potrzeb. Zdecydowanie polecam 💚',
    type: 'positive',
  },
  {
    name: 'Łukasz Jasiukowicz',
    date: '10 kwietnia 2025',
    content: 'Pamela pomagała mi przy projektowaniu mieszkania w Warszawie, szczególnie sypialni i kuchni z całą zabudową stolarską. Dostałem super wizualizacje, które pomogły mi dobrać idealne meble i dodatki. Bardzo dziękuję za dotychczasową współpracę (i bezcenne konsultacje o nieludzkich godzinach nocnych 😃) i czekam na kolejny wspólny projekt 🧡🧡',
    type: 'positive',
  },
  {
    name: 'Emilia Jurak',
    date: '21 marca 2025',
    content: 'Meeega polecam! Każdy projekt to prawdziwe dzieło sztuki! 🌸 Dziewczyna zachwyca dbałością o detale, kreatywnością i nowoczesnym podejściem ✨ Jeśli szukasz wyjątkowych rozwiązań do swojego wnętrza, to właśnie znalazłeś idealny profil!!! Gorąco polecam i dziękuję za projekty ❤️',
    type: 'positive',
  },
  {
    name: 'Marianna Kurzawska',
    date: '21 marca 2025',
    content: 'Przecudowna, profesjonalna obsługa. Pani Pamela jest bardzo kreatywna i wkłada ogrom serca w swoją pracę. Polecam!',
    type: 'positive',
  },
  {
    name: 'Domsia Jastrzębowska',
    date: '20 marca 2025',
    content: 'Pani Pamela przygotowała dla mnie projekt łazienki. Jestem bardzo zadowolona, zarówno ze współpracy, jak i efektu końcowego. Pani Pamela uważnie słucha klienta, doradza, proponuje nowoczesne rozwiązania, ale co najważniejsze funkcjonalne. Szczerze polecam, wszystkim, którzy chcą mieć swoje wymarzone wnętrza. 💙💙💙',
    type: 'positive',
  },
];

const Reviews = () => {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>('positive');

  const positiveReviews = reviews.filter((r) => r.type === 'positive');
  const negativeReviews = reviews.filter((r) => r.type === 'negative');

  const displayedReviews = activeTab === 'positive' ? positiveReviews : negativeReviews;

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-12">{t('reviews.title')}</h1>

        {/* Leave review button */}
        <div className="flex justify-center mb-8">
          <a
            href="https://www.facebook.com/profile.php?id=61574567780622&sk=reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-8 py-3 text-sm font-sans tracking-wide hover:opacity-90 inline-block"
          >
            {t('reviews.leaveReview')}
          </a>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('positive')}
            className={`px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === 'positive'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:opacity-80'
            }`}
          >
            {t('reviews.positive')} ({positiveReviews.length})
          </button>
          <button
            onClick={() => setActiveTab('negative')}
            className={`px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === 'negative'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:opacity-80'
            }`}
          >
            {t('reviews.negative')} ({negativeReviews.length})
          </button>
        </div>

        {/* Reviews list */}
        <div className="max-w-3xl mx-auto space-y-6">
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{t('reviews.empty')}</p>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground text-sm mb-6">{t('reviews.cta')}</p>
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-8 py-3 text-sm font-sans tracking-wide hover:opacity-90 inline-block"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Reviews;
