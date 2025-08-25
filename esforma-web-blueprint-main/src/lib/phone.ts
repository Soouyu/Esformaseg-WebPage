// src/lib/phone.ts
/** Normaliza a E.164 sin '+' para api.whatsapp.com */
export function normalizePhoneUniversal(raw?: string, defaultCC = "593"): string | null {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("00")) digits = digits.slice(2);      // 00<cc>...
  if (digits.length >= 11 && digits.length <= 15) return digits; // ya trae CC

  if (digits.startsWith("0")) return defaultCC + digits.slice(1); // nacional con 0
  if (defaultCC === "593" && digits.length === 9 && digits.startsWith("9"))
    return defaultCC + digits; // móvil EC típico

  if (digits.length < 11) return defaultCC + digits; // último recurso
  return digits;
}
