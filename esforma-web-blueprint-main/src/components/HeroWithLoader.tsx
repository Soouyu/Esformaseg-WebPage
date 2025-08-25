// src/components/HeroWithLoader.tsx
import { useState, useEffect } from "react";
import Hero from "./Hero";
import { Loader } from "./Loader";

export const HeroWithLoader = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Sólo por sesión: sessionStorage en lugar de localStorage
    const seen = sessionStorage.getItem("hasSeenHeroLoader");
    const hasSeen = seen === "true";

    if (!hasSeen) {
      setShowLoader(true);
    }
    setChecked(true);
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("hasSeenHeroLoader", "true");
    setShowLoader(false);
  };

  if (!checked) return null;

  return showLoader
    ? <Loader onFinish={handleFinish} />
    : <Hero />;
};
