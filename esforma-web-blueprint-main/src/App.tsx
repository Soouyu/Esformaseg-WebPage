import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";

import Navigation       from "@/components/Navigation";
import Footer           from "@/components/Footer";
import AboutUs          from "@/components/AboutUs";
import Services         from "@/components/Services";
import Testimonials     from "@/components/Testimonials";
import Contact          from "@/components/Contact";
import NotFound         from "./pages/NotFound";
import { HeroWithLoader } from "@/components/HeroWithLoader";

// 👇 nuevo: botón flotante de WhatsApp
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-right" richColors expand duration={20000} />

        <LayoutGroup>
          <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
            <BrowserRouter>
              <Navigation />

              <main className="min-h-screen pt-8 px-8">
                <Routes>
                  {/* Home con loader solo la primera vez */}
                  <Route path="/" element={<HeroWithLoader />} />

                  {/* Resto de rutas */}
                  <Route path="/sobre-nosotros" element={<AboutUs />} />
                  <Route path="/servicios" element={<Services />} />
                  <Route path="/casos-de-uso" element={<Testimonials />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Botón flotante de WhatsApp presente en todo el sitio */}
              <FloatingWhatsApp />

              <Footer />
            </BrowserRouter>
          </motion.div>
        </LayoutGroup>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
