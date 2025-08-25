import { useEffect, useState } from "react";
import quitoImg from '@/assets/citys/quito-ubicacion.jpeg';
import esmeraldasImg from '@/assets/citys/esmeraldas2.jpg';
import santoDomingoImg from '@/assets/citys/santo-domingo2.jpg';
import orellanaImg from '@/assets/citys/orellana-ubicacion2.jpg';


export interface Location {
  ciudad: string;
  direccion: string;
  coordenadas: { lat: number; lng: number };
  mapaUrl: string;
  email: string;
  whatsapp: string;
  horarios: string;
  imagenCiudad?: string;
}


const sedes: Location[] = [
  {
  ciudad: "Quito",
  direccion: "Av. de las Palmeras N45-91 y de los Madroños, junto al Conjunto Aranjuez 2",
  coordenadas: { lat: -0.180653, lng: -78.467834 },
 mapaUrl: "https://maps.google.com/maps?q=-0.155545,-78.469633&z=19&output=embed",
 email: "infoesformaseg@gmail.com",
    whatsapp: "0983334038 / 0958950304",
    horarios: "8:30 am a 5:00 pm",
    imagenCiudad: quitoImg,

  },
 {
  ciudad: "Esmeraldas",
  direccion: "Ricaurte 4-12 entre Eloy Alfaro y Colón",
  coordenadas: { lat: 0.961550, lng: -79.654216 },
  mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.50326202368495!2d-79.65421625749707!3d0.9615496619017962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f19!3m3!1m2!1s0x8fd4bfb7343eb19f%3A0x45ba51107547aa9b!2sEsformaseg%20Esmeraldas%20Centro%20de%20Capacitacion%20de%20Guardias%20de%20Seguridad!5e0!3m2!1ses-419!2sec!4v1753830217033!5m2!1ses-419!2sec",
  email: "infoesmeraldas.esformaseg@gmail.com",
    whatsapp: "0963936097",
    horarios: "8:30 am a 5:00 pm",
    imagenCiudad: esmeraldasImg,

},
{
  ciudad: "Santo Domingo",
  direccion: "Av. Clemencia de Mora 242 y Calle Río Puyango",
  coordenadas: { lat: -0.2450567, lng: -79.1709463 }, // Coordenadas exactas para geolocalización
  mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4454568191431!2d-79.17094629999998!3d-0.24505670000000032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d546443b11d9b9%3A0x14ea2f1a98f22874!2sQR3H%2BXJ4%2C%20Santo%20Domingo!5e0!3m2!1ses-419!2sec!4v1753831007784!5m2!1ses-419!2sec",
  email: "esformaseg.sdt@gmail.com",
    whatsapp: "0987899306",
    horarios: "8:30 am a 5:00 pm",
    imagenCiudad: santoDomingoImg,
},
{
  ciudad: "Orellana",
  direccion: "Calle Alejandro Labaka y Calle Cabrera (El Coca)",
  coordenadas: { lat: -0.466586, lng: -76.982731 }, // Coordenadas exactas del marcador
  mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.65238738855476!2d-76.98273102750086!3d-0.4665863799144915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d7a5b1b5ea8703%3A0x68ca17c23ab8003a!2sLUBRIMAX!5e0!3m2!1ses-419!2sec!4v1753831123465!5m2!1ses-419!2sec",
 email: "infoelcoca.esformaseg@gmail.com",
    whatsapp: "0984981373",
    horarios: "8:30 am a 5:00 pm",
    imagenCiudad: orellanaImg,
}

];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useNearestSede = (): Location => {
  const [nearest, setNearest] = useState<Location>(sedes[0]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let closest = sedes[0];
          let minDistance = Infinity;

          for (const sede of sedes) {
            const dist = calculateDistance(latitude, longitude, sede.coordenadas.lat, sede.coordenadas.lng);
            if (dist < minDistance) {
              minDistance = dist;
              closest = sede;
            }
          }

          setNearest(closest);
        },
        () => {
          // si falla, se queda con la sede[0]
        }
      );
    }
  }, []);

  return nearest;
};