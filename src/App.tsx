import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import Offer from "./pages/Offer";
import Order from "./pages/Order";
import Portfolio from "./pages/Portfolio";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <CookieConsentProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/offer" element={<Offer />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Footer />
              </div>
              <CookieBanner />
            </BrowserRouter>
          </CookieConsentProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
