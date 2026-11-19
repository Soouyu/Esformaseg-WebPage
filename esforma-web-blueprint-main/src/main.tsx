import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Quita el splash de index.html en páginas sin loader (en "/" lo quita el Loader).
requestAnimationFrame(() => {
  if (window.location.pathname !== "/") document.getElementById("boot-splash")?.remove();
});
