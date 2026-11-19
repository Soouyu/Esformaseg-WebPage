import { useEffect, useSyncExternalStore } from "react";
import { sedes, sedePrincipal, type Location } from "@/data/sedes";

export type { Location } from "@/data/sedes";

/**
 * Sede más cercana — estado compartido por toda la app.
 *
 * - Nunca muestra el permiso de ubicación al cargar la página.
 * - Solo consulta el GPS sin preguntar si el usuario YA dio permiso antes.
 * - El permiso se pide únicamente cuando el usuario pulsa "Usar mi ubicación".
 * - El resultado (o la sede elegida a mano) se guarda en localStorage por 30 días,
 *   así Footer, WhatsApp y Contacto muestran la misma sede sin volver a preguntar.
 */

export type SedeStatus = "default" | "locating" | "located" | "manual" | "denied" | "unavailable";

interface SedeState {
  sede: Location;
  status: SedeStatus;
}

const STORAGE_KEY = "esformaseg:sede";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

const findByCity = (ciudad: string) => sedes.find((s) => s.ciudad === ciudad);

function readCache(): SedeState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { ciudad, status, ts } = JSON.parse(raw);
    const sede = findByCity(ciudad);
    // Si la sede ya no existe (p. ej. se cerró) o expiró, se descarta.
    if (!sede || Date.now() - ts > TTL_MS) return null;
    return { sede, status };
  } catch {
    return null;
  }
}

function writeCache(state: SedeState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ciudad: state.sede.ciudad, status: state.status, ts: Date.now() })
    );
  } catch {
    /* almacenamiento bloqueado: se ignora */
  }
}

let state: SedeState = readCache() ?? { sede: sedePrincipal, status: "default" };
const listeners = new Set<() => void>();

function setState(next: SedeState, persist = true) {
  state = next;
  if (persist && (next.status === "located" || next.status === "manual")) writeCache(next);
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => state;

const distanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const closestTo = (lat: number, lng: number) =>
  sedes.reduce((best, s) =>
    distanceKm(lat, lng, s.coordenadas.lat, s.coordenadas.lng) <
    distanceKm(lat, lng, best.coordenadas.lat, best.coordenadas.lng)
      ? s
      : best
  );

let inFlight = false;

/** Pide la ubicación (muestra el permiso del navegador si aún no se ha dado). */
export function locateNearestSede() {
  if (inFlight) return;
  if (!("geolocation" in navigator)) {
    setState({ sede: state.sede, status: "unavailable" }, false);
    return;
  }
  inFlight = true;
  setState({ sede: state.sede, status: "locating" }, false);
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      inFlight = false;
      setState({ sede: closestTo(coords.latitude, coords.longitude), status: "located" });
    },
    (err) => {
      inFlight = false;
      setState(
        { sede: state.sede, status: err.code === err.PERMISSION_DENIED ? "denied" : "unavailable" },
        false
      );
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60 * 60 * 1000 }
  );
}

/** El usuario elige su sede manualmente. */
export function selectSede(ciudad: string) {
  const sede = findByCity(ciudad);
  if (sede) setState({ sede, status: "manual" });
}

let silentChecked = false;

/** Si el usuario ya había dado permiso antes, ubica sin mostrar ningún diálogo. */
async function silentLocateIfGranted() {
  if (silentChecked || state.status !== "default") return;
  silentChecked = true;
  try {
    const perm = await navigator.permissions?.query({ name: "geolocation" as PermissionName });
    if (perm?.state === "granted") locateNearestSede();
  } catch {
    /* Permissions API no disponible: no hacemos nada (no molestamos al usuario) */
  }
}

/** Estado completo: sede + status. */
export function useSedeState(): SedeState {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  useEffect(() => {
    silentLocateIfGranted();
  }, []);
  return snap;
}

/** Compatibilidad: devuelve solo la sede (Footer, WhatsApp, Contacto). */
export const useNearestSede = (): Location => useSedeState().sede;
