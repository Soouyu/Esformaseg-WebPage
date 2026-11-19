// src/components/HeroWithLoader.tsx
import { useEffect, useState } from "react";
import Hero from "./Hero";
import { Loader } from "./Loader";

const KEY = "hasSeenHeroLoader";

const hasSeenLoader = () => {
  try {
    return sessionStorage.getItem(KEY) === "true";
  } catch {
    return true;
  }
};

/**
 * El Hero se monta desde el inicio (debajo del loader), así el video, las fuentes
 * y las imágenes se descargan MIENTRAS corre la animación. El loader sale solo una vez por sesión.
 */
export const HeroWithLoader = () => {
  const [showLoader, setShowLoader] = useState(() => !hasSeenLoader());

  useEffect(() => {
    if (!showLoader) document.getElementById("boot-splash")?.remove();
  }, [showLoader]);

  const handleFinish = () => {
    try {
      sessionStorage.setItem(KEY, "true");
    } catch {
      /* ignore */
    }
    setShowLoader(false);
  };

  return (
    <>
      <Hero />
      {showLoader && <Loader onFinish={handleFinish} />}
    </>
  );
};
