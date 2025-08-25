import { useEffect, useState } from "react";
import { MapPin, Loader, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNearestSede } from "@/hooks/useNearestSede";
import type { Location } from "@/hooks/useNearestSede";


const sedes: Location[] = [
  {
  ciudad: "Quito",
  direccion: "Av. de las Palmeras N45-91 y de los Madroños, junto al Conjunto Aranjuez 2",
  coordenadas: { lat: -0.180653, lng: -78.467834 },
 mapaUrl: "https://maps.google.com/maps?q=-0.155545,-78.469633&z=19&output=embed",
 email: "infoesformaseg@gmail.com",
    whatsapp: "0983334038 / 0958950304",
    horarios: "8:30 am a 5:00 pm"

  },
 {
  ciudad: "Esmeraldas",
  direccion: "Ricaurte 4-12 entre Eloy Alfaro y Colón",
  coordenadas: { lat: 0.961550, lng: -79.654216 },
  mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.50326202368495!2d-79.65421625749707!3d0.9615496619017962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f19!3m3!1m2!1s0x8fd4bfb7343eb19f%3A0x45ba51107547aa9b!2sEsformaseg%20Esmeraldas%20Centro%20de%20Capacitacion%20de%20Guardias%20de%20Seguridad!5e0!3m2!1ses-419!2sec!4v1753830217033!5m2!1ses-419!2sec",
  email: "infoesmeraldas.esformaseg@gmail.com",
    whatsapp: "0963936097",
    horarios: "8:30 am a 5:00 pm"

},
{
  ciudad: "Santo Domingo",
  direccion: "Av. Clemencia de Mora 242 y Calle Río Puyango",
  coordenadas: { lat: -0.2450567, lng: -79.1709463 }, // Coordenadas exactas para geolocalización
  mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4454568191431!2d-79.17094629999998!3d-0.24505670000000032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d546443b11d9b9%3A0x14ea2f1a98f22874!2sQR3H%2BXJ4%2C%20Santo%20Domingo!5e0!3m2!1ses-419!2sec!4v1753831007784!5m2!1ses-419!2sec",
  email: "esformaseg.sdt@gmail.com",
    whatsapp: "0987899306",
    horarios: "8:30 am a 5:00 pm"
},
{
  ciudad: "Orellana",
  direccion: "Calle Alejandro Labaka y Calle Cabrera (El Coca)",
  coordenadas: { lat: -0.466586, lng: -76.982731 }, // Coordenadas exactas del marcador
  mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431.65238738855476!2d-76.98273102750086!3d-0.4665863799144915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d7a5b1b5ea8703%3A0x68ca17c23ab8003a!2sLUBRIMAX!5e0!3m2!1ses-419!2sec!4v1753831123465!5m2!1ses-419!2sec",
 email: "infoelcoca.esformaseg@gmail.com",
    whatsapp: "0984981373",
    horarios: "8:30 am a 5:00 pm"
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

const NearestLocation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nearest, setNearest] = useState<Location>(sedes[0]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let minDistance = Infinity;
          let closest = sedes[0];

          for (const sede of sedes) {
            const dist = calculateDistance(latitude, longitude, sede.coordenadas.lat, sede.coordenadas.lng);
            if (dist < minDistance) {
              minDistance = dist;
              closest = sede;
            }
          }

          setNearest(closest);
          setLoading(false);
        },
        () => {
          setError(true);
          setLoading(false);
        }
      );
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  const renderLocationInfo = (location: Location) => (
  <div className="space-y-4">
    <div className="flex items-start space-x-4">
      <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
        <MapPin className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-bold text-foreground">{location.ciudad}</h4>
        <p className="text-muted-foreground">{location.direccion}</p>
      </div>
    </div>

    {/* Mapa */}
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={location.mapaUrl}
        width="100%"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    {/* Imagen de la ciudad */}
    {location.imagenCiudad && (
      <img
        src={location.imagenCiudad}
        alt={`Vista de ${location.ciudad}`}
        className="w-full rounded-lg shadow-md object-cover max-h-[300px]"
      />
    )}
  </div>
);


  return (
    <div className="nearest-location-card">
      <Card className="border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Sede más cercana a tu ubicación
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8 space-x-2">
              <Loader className="h-5 w-5 animate-spin text-primary" />
              <p className="text-muted-foreground">Buscando tu ubicación...</p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  No pudimos determinar tu ubicación. Mostrando sede principal.
                </AlertDescription>
              </Alert>
              {renderLocationInfo(sedes[0])}
            </div>
          ) : (
            <div className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                    Según tu ubicación, esta es la sede más cercana:
                </p>
                {renderLocationInfo(nearest)}
                <p className="text-sm sm:text-base text-center text-foreground font-semibold">
                    ¡No lo pienses más y únete al mejor grupo de formación del país!
                </p>
                </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NearestLocation;
