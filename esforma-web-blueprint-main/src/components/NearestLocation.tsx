import { MapPin, Loader, LocateFixed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sedes } from "@/data/sedes";
import { locateNearestSede, selectSede, useSedeState } from "@/hooks/useNearestSede";

const statusText: Record<string, string> = {
  default: "Mostrando nuestra sede principal. Elige tu ciudad o usa tu ubicación.",
  locating: "Buscando tu ubicación...",
  located: "Según tu ubicación, esta es la sede más cercana:",
  manual: "Sede seleccionada:",
  denied: "No tenemos permiso para ver tu ubicación. Elige tu ciudad:",
  unavailable: "No pudimos determinar tu ubicación. Elige tu ciudad:",
};

const NearestLocation = () => {
  const { sede, status } = useSedeState();

  return (
    <div className="nearest-location-card">
      <Card className="border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Sede más cercana a tu ubicación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
            {status === "locating" && <Loader className="h-4 w-4 animate-spin text-primary" />}
            {statusText[status]}
          </p>

          {/* Selector de sede + botón de ubicación */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Elegir sede">
            {sedes.map((s) => (
              <Button
                key={s.ciudad}
                type="button"
                size="sm"
                variant={s.ciudad === sede.ciudad ? "default" : "outline"}
                aria-pressed={s.ciudad === sede.ciudad}
                onClick={() => selectSede(s.ciudad)}
              >
                {s.ciudad}
              </Button>
            ))}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-primary"
              onClick={locateNearestSede}
              disabled={status === "locating"}
            >
              <LocateFixed className="h-4 w-4 mr-1" />
              Usar mi ubicación
            </Button>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">{sede.ciudad}</h4>
              <p className="text-muted-foreground">{sede.direccion}</p>
            </div>
          </div>

          <iframe
            key={sede.ciudad}
            title={`Mapa de la sede ${sede.ciudad}`}
            src={sede.mapaUrl}
            width="100%"
            height="200"
            className="rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {sede.imagenCiudad && (
            <img
              src={sede.imagenCiudad}
              alt={`Vista de ${sede.ciudad}`}
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg shadow-md object-cover max-h-[300px]"
            />
          )}

          <p className="text-sm sm:text-base text-center text-foreground font-semibold">
            ¡No lo pienses más y únete al mejor grupo de formación del país!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NearestLocation;
