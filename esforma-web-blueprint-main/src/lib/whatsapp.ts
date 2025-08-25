// src/lib/whatsapp.ts
export function openWhatsAppUniversal(phone: string, plainMessage: string): void {
  if (typeof window === "undefined") return;

  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return;

  const text = encodeURIComponent(plainMessage || "");
  const url =
    `https://api.whatsapp.com/send?phone=${digits}&text=${text}` +
    `&type=phone_number&app_absent=0&_=${Date.now()}`; // cache-buster

  // 1) Nueva pestaña (más fiable para preservar ?text=)
  const w = window.open(url, "_blank");
  // 2) Fallback si el popup fue bloqueado
  if (!w) window.location.href = url;
}
export default openWhatsAppUniversal;
