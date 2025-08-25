import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Item {
  id: string;
  icon: React.ElementType;
  title: string;
  duration: string;
  description: string;
  features: string[];
}

interface Props {
  items: Item[];
  openItemId: string | null;
  onToggle: (id: string) => void;
  onSelect: (title: string) => void;
}

export const ServiceAccordion = ({ items, openItemId, onToggle, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
      {items.map((item) => {
        const { id, icon: Icon, title, duration, description, features } = item;
        const isOpen = openItemId === id;
        console.log("🟢 Tarjeta:", id, "| ¿Está abierta?:", isOpen, "| openItemId global:", openItemId);

        return (
          <Card key={id} className="flex flex-col border border-border/50 overflow-hidden transition-all duration-300">
            {/* Header */}
            <div
              className="cursor-pointer p-4 sm:p-6 flex items-center justify-between"
              onClick={() => onToggle(id)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-xl font-bold">
                    {title}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {duration}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

           <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[1000px] opacity-100 py-4 px-4 sm:px-6" : "max-h-0 opacity-0 py-0 px-0"
                }`}
                >
                <CardContent className="space-y-4">
                    <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
                    <ul className="space-y-1">
                    {features.map((f) => (
                        <li key={f} className="flex text-xs sm:text-sm">
                        <span className="mr-2 mt-[6px] block w-1 h-1 bg-primary rounded-full" />
                        {f}
                        </li>
                    ))}
                    </ul>
                    <Button
                    className="w-full bg-primary hover:bg-secondary text-white"
                    onClick={() => onSelect(title)}
                    >
                    Más información
                    </Button>
                </CardContent>
                </div>
          </Card>
        );
      })}
    </div>
  );
};
