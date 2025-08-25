import { Shield, Repeat, Users, Settings, Eye, MonitorSmartphone,Target,Calendar,Banknote,UserCog,Truck,Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AnimateOnScroll from "@/components/AnimateOnScroll";

const Services = () => {
  
  
  const services = [
    {
      icon: Users,
      title: "Curso de Guardia de Vigilancia y Seguridad Privada (Fijo)",
      description:
        "Formación integral con enfoque humanista, técnico y legal para desempeñarse como guardia de seguridad privada. Modalidad presencial con horarios flexibles.",
      features: [
        "Legislación en seguridad",
        "Defensa personal y primeros auxilios",
        "Manejo básico de armas",
        "Desarrollo personal y navegación web",
        "Con el aval del Ministerio del interior"
      ],
      duration: "120 horas académicas"
    },
    {
      icon: MonitorSmartphone,
      title: "Curso de Guardia de Seguridad Privada (Móvil)",
      description:
        "Modalidad intensiva y flexible, pensada para contextos móviles. Incluye práctica presencial en manejo de armas y módulos claves adaptados a las necesidades del cliente.",
      features: [
        "Entrenamiento modular",
        "12h presenciales en armas",
        "Tutorías virtuales",
        "Certificado oficial SICOSEP"
      ],
      duration: "70 horas académicas"
    },
    {
      icon: Repeat,
      title: "Cursos de Reentrenamiento",
      description:
        "Actualización profesional obligatoria para quienes ya han aprobado el primer nivel. Horarios flexibles y módulos personalizables.",
      features: [
        "3 módulos seleccionables",
        "Defensa personal / primeros auxilios",
        "Certificación oficial de reentrenamiento",
        "Acompañamiento virtual"
      ],
      duration: "18 horas académicas"
    },
    {
      icon: Settings,
      title: "Supervisores de Seguridad Privada",
      description:
        "Formación especializada en liderazgo operativo para supervisores de servicios de vigilancia. Modalidad virtual, con énfasis en ética y tecnología.",
      features: [
        "Legislación para supervisores",
        "Relaciones humanas",
        "Simuladores y navegación web",
        "Certificado avalado por el Ministerio"
      ],
      duration: "90 horas académicas"
    },
    {
      icon: Eye,
      title: "Manejo de Consolas",
      description:
        "Especialización enfocada en monitoreo, operación de consolas y vigilancia electrónica. Modalidad virtual con jornadas cortas y contenido actualizado.",
      features: [
        "Entrenamiento técnico",
        "Tutorías y navegación online",
        "Certificación ministerial",
        "Ideal para control de sistemas de vigilancia"
      ],
      duration: "60 horas académicas"
    },
    {
      icon: Shield,
      title: "Cursos de Especialización Adicional",
      description:
        "Formaciones específicas en campos de alta demanda. Disponibles bajo demanda según necesidad de empresas o instituciones.",
      features: [
        "Seguridad en bares y eventos",
        "Custodia de valores y escoltas VIP",
        "Carga crítica y seguridad financiera",
        "Programas adaptados a cada sector"
      ],
      duration: "Variable según especialidad"
    }
  ];

  const navigate = useNavigate();
  

  const especializaciones = [
  {
    Icon: Target,
    title: "Curso de Destreza de Arma de Fuego",
    description: "Curso obligatorio para el porte de armas, enfocado a civiles (empresarios, ganaderos, etc.).",
    features: [
      "48 horas de formación",
      "Requisitos: 25+ años, certificados biométrico, psicológico y psiquiátrico",
      "Sin antecedentes penales",
      "Certificación oficial"
    ],
    duration: "48 horas"
  },
  {
    Icon: Calendar,
    title: "Control de Eventos Públicos y Escenarios Deportivos Nivel 1",
    description: "Especialización en manejo de multitudes y seguridad en eventos masivos.",
    features: [
      "Normativa legal específica",
      "Identificación de riesgos",
      "Primeros auxilios",
      "Defensa personal con armas no letales",
      "Radio comunicaciones"
    ],
    duration: "30 horas"
  },
  {
    Icon: Shield,
    title: "Seguridad en Bares y Eventos Nivel 1",
    description: "Manejo de zonas públicas con protocolos para evitar conflictos.",
    features: [
      "Plan de emergencia",
      "Análisis de riesgos",
      "Uso de extintores",
      "Manejo de amenazas de atentados",
      "Procedimientos ante robos"
    ],
    duration: "60 horas"
  },
  {
    Icon: Banknote,
    title: "Custodia y Transporte de Valores Nivel 2",
    description: "Especialización en seguridad para transporte de valores en vehículos blindados.",
    features: [
      "Normativa legal",
      "Identificación de riesgos",
      "Seguridad de la información",
      "Técnicas de reacción a asaltos",
      "Armas de dotación"
    ],
    duration: "40 horas"
  },
  {
    Icon: UserCog,
    title: "Escoltas VIP Nivel 2",
    description: "Formación en técnicas modernas de protección para personas importantes.",
    features: [
      "Relaciones humanas",
      "Medios de protección",
      "Defensa personal",
      "Coordinación con fuerza pública",
      "Radio comunicaciones"
    ],
    duration: "40 horas"
  },
  {
    Icon: Truck,
    title: "Carga Crítica Nivel 2",
    description: "Técnicas especializadas para custodia de cargas de alto valor.",
    features: [
      "Seguridad en convoyes",
      "Estudio de rutas",
      "Procedimientos operativos",
      "Prácticas de tiro defensivo",
      "Coordinación con autoridades"
    ],
    duration: "30 horas"
  },
  {
    Icon: Briefcase,
    title: "Seguridad Financiera Nivel 1",
    description: "Formación especializada para instituciones financieras.",
    features: [
      "Identificación de perfiles delictivos",
      "Protocolos frente a asaltos",
      "Seguridad física en instalaciones",
      "Armas no letales",
      "Coordinación con fuerza pública"
    ],
    duration: "40 horas"
  }
];
const [openIndex, setOpenIndex] = useState<number | null>(null);



return (
  <>
   <section className="animated-lines-bg py-12 sm:py-20 services-responsive">
      <div className="w-full px-2 sm:px-6 lg:px-8 mx-auto max-w-screen-2xl">

        <div className="text-center mb-12 sm:mb-16">
          <AnimateOnScroll type="rotateReveal">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
              Nuestros Servicios
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll type="slideInSkew" delay={0.1}>
            <p className="text-sm sm:text-xl text-muted-foreground mx-auto max-w-2xl">
              Capacitaciones avaladas por el Ministerio del Interior.
            </p>
          </AnimateOnScroll>
        </div>
           <AnimateOnScroll type="fadeInScale" delay={0.05}>
      <div className="flex justify-center items-center gap-2 mb-3">
        <Shield className="w-6 h-6 text-primary animate-pulse" />
        <span className="text-sm text-primary font-semibold uppercase tracking-wider">Formación Oficial</span>
      </div>
    </AnimateOnScroll>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 services-grid">
          {services.map((service, index) => (
  <AnimateOnScroll
    key={index}
    type={index % 2 === 0 ? "flipInY" : "zoomBounce"}
        delay={index * 0.1}
      >
        <Card className="w-full hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 border border-border/50 group flex flex-col">
          <div
            className="cursor-pointer p-4 sm:p-6 flex items-center justify-between"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 group-hover:bg-primary/20 w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-colors duration-300">
              <service.icon className="h-5 w-5 sm:h-8 sm:w-8 text-primary animate-pulse-delayed" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">{service.duration}</p>
              </div>
            </div>

            {/* 🔽 FLECHA (opcional pero recomendado visualmente) */}
            <svg
            className={`w-5 h-5 text-primary transition-transform duration-300 ${
      openIndex === index ? "rotate-180" : ""
    }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

        {/* 🔸 CONTENIDO EXPANDIBLE */}
   {openIndex === index && (
  <CardContent className="space-y-3 sm:space-y-6 px-4 sm:px-6 pb-6 transition-all duration-500 ease-in-out">
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
      {service.description}
    </p>
    <div>
      <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">
        Contenido:
      </h4>
     <ul className="space-y-1 sm:space-y-2">
      {service.features.map((feature, i) => (
        <li key={i} className="flex items-start text-sm sm:text-base text-muted-foreground">
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 sm:mr-3 mt-1 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    </div>

    <Button
      className="w-full bg-primary hover:bg-secondary hover:text-white text-white font-semibold transition-all duration-300 text-xs sm:text-sm"
      onClick={() => {
        localStorage.setItem("cursoSeleccionado", service.title);
        navigate("/contacto#contacto");
      }}
    >
      Más información
    </Button>
  </CardContent>
)}
    </Card>
  </AnimateOnScroll>
))}

        </div>

        <div className="text-center mt-12 sm:mt-16">
          <AnimateOnScroll type="fadeInScale" delay={0.3}>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              ¿Necesitas un curso personalizado?
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll type="zoomBounce" delay={0.4}>
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-4 py-2 sm:px-8 sm:py-4 text-xs sm:text-base"
              onClick={() => {
                localStorage.setItem("cursoSeleccionado", "Cotización Personalizada");
                navigate("/contacto#contacto");
              }}
            >
              Solicitar cotización
            </Button>
          </AnimateOnScroll>
        </div>
      </div>
    </section>

    <section id="especializaciones" className="py-12 sm:py-20 special-animated-bg full-bleed services-responsive">
  <div className="w-full px-2 sm:px-6 lg:px-8 mx-auto max-w-screen-2xl">

    <div className="text-center mb-12 sm:mb-16">
      <AnimateOnScroll type="rotateReveal">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-primary drop-shadow">
          Cursos de Especialización
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll type="slideInSkew" delay={0.1}>
        <p className="text-sm sm:text-xl text-white mx-auto max-w-2xl">
  Formación avanzada en áreas específicas de seguridad, logística y protección ejecutiva.
</p>

      </AnimateOnScroll>
    </div>

    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 services-grid">
      {especializaciones.map((esp, index) => {
        const Icon = esp.Icon;
        return (
          <AnimateOnScroll
            key={index}
            type={index % 2 === 0 ? "flipInY" : "zoomBounce"}
            delay={index * 0.1}
          >
            <Card className="w-full h-full lava-card-bg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 border border-white/20 rounded-xl group flex flex-col text-black backdrop-blur-md">

             <CardHeader className="pb-2 sm:pb-4 border-b-4 border-gray/70 mb-4">

                <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    index % 3 === 0 ? "bg-blue-100 text-blue-700" :
                    index % 3 === 1 ? "bg-green-100 text-green-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    <Icon className="h-5 w-5 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {esp.title}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground">{esp.duration}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {esp.description}
                </p>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2">Contenido principal:</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {esp.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm sm:text-base text-muted-foreground">
                        <div className="w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-secondary hover:text-white text-white font-semibold transition-all duration-300 text-xs sm:text-sm"
                  onClick={() => {
                    localStorage.setItem("cursoSeleccionado", esp.title);
                    navigate("/contacto#contacto");
                  }}
                >
                  Más información
                </Button>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        );
      })}
    </div>
  </div>
</section>
</>
  );
};
export default Services;
