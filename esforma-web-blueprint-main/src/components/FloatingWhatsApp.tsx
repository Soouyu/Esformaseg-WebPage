// src/components/FloatingWhatsApp.tsx
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNearestSede } from "@/hooks/useNearestSede";
import { openWhatsAppUniversal } from "@/lib/whatsapp";
import { normalizePhoneUniversal } from "@/lib/phone";

/** Permite "soltar" varios números en una sola cadena: "0983..., 0958.../ 02-xxx" */
function extractPhones(all?: string): string[] {
  if (!all) return [];
  return all
    .split(/[\/,;|\n]+/g)
    .map(s => s.trim())
    .filter(Boolean);
}

/** Dedupe manteniendo orden (primero que aparece, primero queda) */
function uniqueOrder(arr: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of arr) {
    if (!seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}

const FloatingWhatsApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const nearest = useNearestSede();
  const [selected, setSelected] = useState(0);

  // Mensaje prellenado (con curso si existe en localStorage)
  const [prefill, setPrefill] = useState(
    "¡Hola! Me interesa obtener más información sobre sus cursos."
  );

  useEffect(() => {
    const savedCourse = localStorage.getItem("cursoSeleccionado");
    if (savedCourse) {
      setPrefill(
        `¡Hola! Me interesa el curso "${savedCourse}". ¿Podrían darme más información?`
      );
    }
  }, []);

  // Normaliza y ordena números (móviles EC primero)
  const phones = useMemo(() => {
    const raw = extractPhones(nearest?.whatsapp);
    const normalized = raw
      .map(n => normalizePhoneUniversal(n, "593")) // Ecuador
      .filter((x): x is string => Boolean(x));

    const ecMobiles = normalized.filter(n => n.startsWith("5939"));
    const others = normalized.filter(n => !n.startsWith("5939"));
    return uniqueOrder([...ecMobiles, ...others]);
  }, [nearest?.whatsapp]);

  const city = nearest?.ciudad ?? "Sede";

  // CTA principal: abre el seleccionado o el primero disponible
  const handleClickSelected = () => {
    const number =
      phones[selected] ?? normalizePhoneUniversal(nearest?.whatsapp || "", "593");
    if (!number) return;
    openWhatsAppUniversal(number, prefill);
  };

  // Abrir un número específico desde la lista
  const handleClickNumber = (num: string, idx: number) => {
    setSelected(idx);
    openWhatsAppUniversal(num, prefill);
  };

  // Si no hay números válidos, no mostramos el FAB
  if (!phones.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="wa-panel"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="bg-white shadow-2xl rounded-2xl p-4 w-72 mb-2 border border-gray-200"
          >
            <h4 className="text-base font-semibold text-gray-900 mb-1">
              WhatsApp — {city}
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Te atenderemos desde la sede más cercana:{" "}
              <span className="font-medium">{city}</span>.
            </p>

            {phones.length > 1 && (
              <div className="space-y-2 mb-3 max-h-44 overflow-auto pr-1">
                {phones.map((num, idx) => (
                  <button
                    key={`${num}-${idx}`}
                    onClick={() => handleClickNumber(num, idx)}
                    className={`w-full flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition
                      ${selected === idx ? "border-green-500 bg-green-50" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    <Phone className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="truncate">+{num}</span>
                    {selected === idx && (
                      <span className="ml-auto text-[11px] font-semibold text-green-700">
                        seleccionado
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleClickSelected}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg transition"
            >
              Abrir chat en WhatsApp
            </button>

            <p className="text-[11px] text-gray-500 mt-2">
              Si no tienes la app instalada, se abrirá WhatsApp Web.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(v => !v)}
        aria-label="WhatsApp"
        className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-green-500 hover:bg-green-600 text-white"
      >
        {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
