import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { HeroWithLoader } from "@/components/HeroWithLoader";

// Páginas internas: se descargan solo cuando el usuario las visita
const AboutUs = lazy(() => import("@/components/AboutUs"));
const Services = lazy(() => import("@/components/Services"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Precarga las páginas internas en segundo plano cuando el navegador está libre
const prefetchPages = () => {
  import("@/components/AboutUs");
  import("@/components/Services");
  import("@/components/Contact");
};

/** Al cambiar de página: sube al inicio, o baja al #ancla si existe. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    const id = window.setInterval(() => {
      const el = document.querySelector(hash);
      if (el || ++tries > 20) {
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.clearInterval(id);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [pathname, hash]);
  return null;
}

const PageFallback = () => <div className="min-h-screen" aria-busy="true" />;

export default function App() {
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(prefetchPages);
    else setTimeout(prefetchPages, 3000);
  }, []);

  return (
    <TooltipProvider>
      <Toaster position="top-right" richColors expand duration={20000} />
      <BrowserRouter>
        <ScrollManager />
        <Navigation />

        <main className="min-h-screen pt-[var(--nav-h)] px-0">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HeroWithLoader />} />
              <Route path="/sobre-nosotros" element={<AboutUs />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/casos-de-uso" element={<Testimonials />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <FloatingWhatsApp />
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  );
}
