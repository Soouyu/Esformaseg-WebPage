// src/components/Loader.tsx
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import esformasegLogo from "@/assets/esformaseg-logo.png";

interface LoaderProps {
  onFinish: () => void;
}

export const Loader = ({ onFinish }: LoaderProps) => {
  // 👉 Ajusta estos tiempos si quieres aún más velocidad
  const MESSAGE_INTERVAL_MS = 1800; // antes 3000
  const ENTER_DURATION = 2.2;       // antes 5
  const PAUSE_MS = 1200;            // antes 5000
  const EXIT_DURATION = 1.6;        // antes 5

  const [currentMessage, setCurrentMessage] = useState(0);
  const controls = useAnimation();
  const messages = [
    "Cargando los mejores componentes",
    "Preparando contenido exclusivo",
    "Optimizando tu experiencia",
    "Listo para comenzar"
  ];

  useEffect(() => {
    let cancelled = false;

    // Mensajes más rápidos
    const msgInterval = setInterval(() => {
      setCurrentMessage((m) => (m + 1) % messages.length);
    }, MESSAGE_INTERVAL_MS);

    // Animaciones más ágiles
    (async () => {
      await controls.start({
        x: 0,
        transition: { duration: ENTER_DURATION, ease: "easeInOut" }
      });
      await new Promise((r) => setTimeout(r, PAUSE_MS));
      if (cancelled) return;
      await controls.start({
        y: -200,
        transition: { duration: EXIT_DURATION, ease: "easeInOut" }
      });
      if (!cancelled) onFinish();
    })();

    return () => {
      cancelled = true;
      clearInterval(msgInterval);
    };
  }, [controls, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Logo responsivo */}
      <motion.img
        src={esformasegLogo}
        alt="Logo Esformaseg"
        className="w-20 h-20 mb-4 sm:w-24 sm:h-24 sm:mb-5 md:w-32 md:h-32 md:mb-6"
        initial={{ x: -200, y: 0 }}
        animate={controls}
      />

      {/* Texto con animación más viva */}
      <div className="text-white font-medium flex items-center space-x-2 text-sm sm:text-base md:text-lg lg:text-xl">
        <motion.span
          key={currentMessage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {messages[currentMessage]}
        </motion.span>
        <motion.span
          className="text-base sm:text-lg md:text-xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          …
        </motion.span>
      </div>
    </motion.div>
  );
};
