// src/components/Loader.tsx
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import esformasegLogo from "@/assets/esformaseg-logo.webp";

interface LoaderProps {
  /** Se llama cuando la animación de salida termina. */
  onFinish: () => void;
}

const MIN_MS = 1400; // duración mínima para que la animación se aprecie
const MAX_MS = 3000; // nunca bloquea más de esto aunque la red sea lenta

/** Espera a que la fuente y el poster del hero estén listos (o al tiempo máximo). */
function waitForCriticalAssets(): Promise<void> {
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
  const poster = new Promise<void>((resolve) => {
    const video = document.querySelector<HTMLVideoElement>("#inicio video");
    if (!video?.poster) return resolve();
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = video.poster;
  });
  return Promise.all([fonts, poster]).then(() => undefined);
}

export const Loader = ({ onFinish }: LoaderProps) => {
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Quita el splash estático de index.html: este loader lo reemplaza sin parpadeo
    document.getElementById("boot-splash")?.remove();

    let done = false;
    const leave = () => {
      if (!done) {
        done = true;
        setLeaving(true);
      }
    };
    const start = performance.now();
    waitForCriticalAssets().then(() => {
      const elapsed = performance.now() - start;
      setTimeout(leave, Math.max(0, MIN_MS - elapsed));
    });
    const cap = setTimeout(leave, MAX_MS);
    return () => clearTimeout(cap);
  }, []);

  return (
    <motion.div
      role="status"
      aria-label="Cargando Esformaseg"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      initial={false}
      animate={leaving ? { opacity: 0, y: reduceMotion ? 0 : "-100%" } : { opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && onFinish()}
    >
      <div className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36">
        {/* Anillo de progreso */}
        {!reduceMotion && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <motion.circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: leaving ? 1 : 0.85 }}
              transition={{ duration: leaving ? 0.25 : MIN_MS / 1000, ease: "easeOut" }}
            />
          </svg>
        )}
        <motion.img
          src={esformasegLogo}
          alt=""
          width={96}
          height={96}
          className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        />
      </div>

      <motion.p
        className="mt-6 text-white/80 text-sm md:text-base tracking-[0.3em] uppercase"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Esformaseg
      </motion.p>
    </motion.div>
  );
};
