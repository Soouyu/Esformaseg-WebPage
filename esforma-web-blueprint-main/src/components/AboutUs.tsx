import { Target, Eye, Heart, Award, Users, Shield, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import escudo from "@/assets/fondo-nodos.mp4";
import { sedes as sedesData } from "@/data/sedes";
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useRef } from 'react'

import { Info, FileText, Globe } from "lucide-react";
import security from '@/assets/security.webp'
import sedes from '@/assets/fondo-sedes.webp'
import cert1 from "@/assets/cert1.webp";
import cert2 from "@/assets/cert2.webp";
import cert3 from "@/assets/cert3.webp";
import cert4 from "@/assets/cert4.webp";
import cert5 from "@/assets/cert5.webp"
import cert6 from "@/assets/cert6.webp"
import certCARR from "@/assets/certificado-1.webp";
import diploma1 from "@/assets/diploma-1.webp";
import diploma2 from "@/assets/diploma-2.webp";
import diploma3 from "@/assets/diploma-3.webp";
import diploma4 from "@/assets/diploma-4.webp";
import diploma5 from "@/assets/diploma-5.webp";


interface Props {
  images: string[]
}

const AboutUs = () => {

  const certs = [
  certCARR,
  diploma1,
  diploma2,
  diploma3,
  diploma4,
  diploma5,
];


  const values = [
    {
      icon: Target,
      title: "Misión",
      description:
        "Formar de manera integral a Agentes y/o Guardias en Vigilancia y Seguridad Privada, con orientación ética y conocimientos técnicos, científicos y humanísticos actualizados.",
    },
    {
      icon: Eye,
      title: "Visión",
      description:
        "Consolidarnos como el centro educativo líder a nivel nacional en formación y especialización en seguridad privada, garantizando calidad bajo normativa legal vigente.",
    },
    {
      icon: Heart,
      title: "Valores",
      description:
        "Ética, responsabilidad, compromiso, profesionalismo, respeto e integridad. Formamos guardias con principios sólidos y vocación de servicio.",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

useEffect(() => {
  if (!emblaApi) return;
  const interval = setInterval(() => {
    emblaApi.scrollNext();
  }, 4000);
  return () => clearInterval(interval);
}, [emblaApi]);


  const certifications = [
    {
      icon: Award,
      title: "Certificación Oficial",
      description: "Reconocimiento del Ministerio del Interior — Acuerdo Ministerial No. 0091",
    },
    {
      icon: Shield,
      title: "Licencia MICSE",
      description: "Autorización nacional para impartir formación en vigilancia y seguridad privada",
    },
    {
      icon: Users,
      title: "Instructores Certificados",
      description: "Equipo docente con formación profesional, experiencia operativa y constante actualización",
    },
  ];

  const branches = sedesData.map((s) => ({ city: s.ciudad, address: s.direccion }));

  

  return (
    <>
    <style>{`
    @keyframes subtleBlink {
      0%,100% { filter: drop-shadow(0 0 0 rgba(220,38,38,0)); transform: scale(1); }
      45% { filter: drop-shadow(0 0 8px rgba(220,38,38,0.3)); transform: scale(1.015); }
      50% { filter: drop-shadow(0 0 0 rgba(220,38,38,0)); transform: scale(1); }
    }
    .blink-slow {
      animation: subtleBlink 6s ease-in-out infinite;
    }
  `}</style>
    {/* 🔹 HERO CON VIDEO DE FONDO */}
<section id="sobre" className="relative w-full full-bleed overflow-hidden hero-about-extend pb-20">
  {/* 🎥 Video de fondo */}
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={escudo} type="video/mp4" />
    Tu navegador no soporta el video.
  </video>

  {/* 🧱 Capa oscura */}
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

  {/* 🔰 Contenedor principal con la corrección de alineación */}
  <div className="relative z-20 max-w-6xl mx-auto px-6 pt-20 grid grid-cols-1 md:grid-cols-[auto,1fr] items-start gap-8 text-white">
    
    {/* 🧍 Contenedor de imagen + caja extendida con la corrección de margen */}
    <div className="flex flex-col items-center relative">
      {/* 🖼️ Imagen con clase de margen ajustada */}
      <AnimateOnScroll delay={0.3} type="zoomBounce">
        <img
          src={security}
          alt="Instructor profesional de seguridad"
          className="w-full max-w-xs md:max-w-sm mx-auto drop-shadow-2xl md:mt-0"
        />
      </AnimateOnScroll>

      {/* 🟦 Caja extendida hacia abajo y con la animación corregida */}
      <AnimateOnScroll delay={0.4} type="fadeInUp">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 pt-4 pb-4 text-sm text-white text-center w-full max-w-md shadow-lg -mt-1">
          <p className="text-sm text-white/90 mb-6">
            <strong>Profesionales capacitados</strong> con ética, disciplina y formación integral para proteger con responsabilidad.
          </p>
          
          {/* Contenido adicional en la caja */}
          <AnimateOnScroll delay={0.5} type="fadeInUp">
            <div className="border-t border-white/20 pt-4">
              <h4 className="text-lg font-bold text-primary mb-3 flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Reconocimientos
              </h4>
              <div className="flex flex-col gap-4 text-left">
                {certifications.map((cert, i) => (
                  <AnimateOnScroll key={i} delay={0.6 + i * 0.1} type="fadeInRight">
                    <div className="flex items-start gap-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <cert.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-white/95">{cert.title}</p>
                        <p className="text-white/70 text-xs mt-1">{cert.description}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </AnimateOnScroll>
    </div>
    
    {/* 🎯 Texto institucional */}
    <div className="text-center md:text-left">
      <AnimateOnScroll delay={0.1} type="fadeInScale">
        <h1 className="text-5xl font-extrabold text-primary mb-2 drop-shadow tracking-wide">
          Sobre Nosotros
        </h1>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.2} type="fadeInUp">
        <p className="text-base sm:text-lg md:text-xl text-white/70 italic mb-10 tracking-wide leading-snug">
          “Comprometidos con la excelencia en seguridad, ética y servicio al país.”
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.3} type="fadeInUp">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
          <Info className="w-5 h-5 text-primary" />
          Quiénes somos
        </h3>
        <p className="text-md text-white/80 leading-relaxed mb-6">
          Esformaseg forma profesionales en seguridad privada desde <strong>2015</strong>, con aval oficial del <strong>Ministerio del Interior del Ecuador</strong>. Nuestra misión es garantizar una formación integral, ética y operativa con impacto nacional.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.4} type="fadeInUp">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
          <FileText className="w-5 h-5 text-primary" />
          Reconocimientos Legales
        </h3>
        <p className="text-md text-white/80 leading-relaxed mb-6">
          Nuestra institución fue legalmente constituida en <strong>2015</strong> y actualmente opera bajo el <strong>Acuerdo Ministerial No. 0091</strong> del 30 de agosto de 2023. <strong>Operamos bajo la Ley Orgánica de Vigilancia y Seguridad Privada</strong>, cumpliendo estrictamente la normativa vigente.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.5} type="fadeInUp">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
          <Globe className="w-5 h-5 text-primary" />
          Impacto Nacional
        </h3>
        <p className="text-md text-white/80 leading-relaxed mb-6">
          Con más de una década de experiencia, hemos capacitado a cientos de agentes comprometidos con el bienestar ciudadano. Nuestra metodología combina teoría, práctica y formación ética. Esformaseg tiene presencia en diversas provincias del país, acercando formación profesional de calidad a todos los rincones del Ecuador.
        </p>
      </AnimateOnScroll>
    </div>
  </div>
</section>


 <section className="relative dot-grid-bg pt-40 pb-20 full-bleed overflow-hidden">
    {/* 🔴 SVG decorativo con animación scroll (intacto) */}
    <AnimateOnScroll type="fadeInUp" delay={0}>
      <div className="w-full">
        <svg
          viewBox="0 0 500 50"
          preserveAspectRatio="none"
          className="w-full h-14"
        >
          <path d="M0,30 C150,80 350,0 500,30 L500,00 L0,0 Z" fill="red" />
        </svg>
      </div>
    </AnimateOnScroll>

    {/* 🎯 Contenido institucional */}
    <div className="max-w-6xl mx-auto px-4">
      <AnimateOnScroll type="rotateReveal" delay={0.1}>
        <div className="mb-12 text-center mt-10">
          <h3 className="text-3xl font-bold text-primary">
            Nuestra Identidad Institucional
          </h3>
          <p className="text-gray-600 text-lg mt-2 max-w-2xl mx-auto">
            Principios que guían nuestra labor formativa en seguridad privada,
            construidos sobre ética, calidad y compromiso con el país.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {values.map((value, i) => {
          const animationType =
            i === 0 ? "slideInSkew" : i === 1 ? "zoomBounce" : "flipInY";

          return (
            <AnimateOnScroll key={i} delay={i * 0.1} type={animationType}>
              <Card className="h-full bg-white/30 backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0">
                <CardHeader className="text-center pb-2">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary blink-slow" />
                  </div>
                  <CardTitle className="text-lg font-bold text-primary">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          );
        })}
      </div>
    </div>
  </section>
<section className="relative w-full full-bleed overflow-hidden py-24">
  {/* 🔥 Fondo animado con zoom suave */}
  <div
    className="absolute inset-0 z-0 bg-cover bg-center scale-100 animate-fade-zoom"
    style={{
      backgroundImage: `url(${sedes})`,
    }}
  />

  {/* 🧱 Capa oscura opcional si quieres mejorar contraste */}
  {/* <div className="absolute inset-0 z-0 bg-black/30" /> */}

  {/* 🌐 Contenido principal encima del fondo */}
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    <AnimateOnScroll type="fadeInUp" delay={0.1}>
      <h3 className="text-4xl font-bold text-center mb-12 text-white drop-shadow">
        📍 Sedes a Nivel Nacional
      </h3>
    </AnimateOnScroll>

    <div className="grid md:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
      {branches.map((branch, i) => {
        const animationList: Parameters<typeof AnimateOnScroll>[0]["type"][] = [
          "zoomBounce",
          "slideInSkew",
          "rotateReveal",
          "flipInY",
        ];
        const animationType = animationList[i % animationList.length];

        return (
          <AnimateOnScroll key={i} delay={i * 0.1} type={animationType}>
            <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-lg hover:scale-[1.03] transition duration-300 flex items-start gap-4 backdrop-blur-sm">
              <div className="bg-primary/20 p-3 rounded-full">
                <MapPin className="text-white w-6 h-6 drop-shadow" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{branch.city}</p>
                <p className="text-sm text-white/80 mt-1">{branch.address}</p>
              </div>
            </div>
          </AnimateOnScroll>
        );
      })}
    </div>
  </div>
</section>

  <section className="cert-bg pt-20 pb-0 full-bleed">

        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-8 shadow-lg">
            <h3 className="text-3xl font-bold text-center mb-10 text-primary drop-shadow">
              Certificados de Formación
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
              <div className="bg-primary/20 p-4 rounded-full">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <p className="text-center md:text-left text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
                Nuestro equipo docente está conformado por profesionales certificados a nivel nacional e internacional. Estos documentos avalan su experiencia, formación y compromiso con la excelencia en seguridad.
              </p>
            </div>

            <div className="cert-carousel-wrapper overflow-hidden" ref={emblaRef}>
  <div className="cert-carousel-track flex gap-6 px-6">
    {certs.concat(certs).map((img, i) => (  // duplica para que siempre haya “cola”
      <div
        key={i}
        className="flex-none basis-[250px] max-w-[250px]"  // sin mr-6
      >
        <div className="rounded-xl overflow-hidden shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
          <img
          src={img}
          alt={`Certificado ${i + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-[180px] object-contain block bg-white"
        />

        </div>
      </div>
    ))}
  </div>
</div>

          </div>
        </div>
      </section>
<div className="w-full full-bleed -mt-1 cert-bg h-14">
  <svg
    viewBox="0 0 500 50"
    preserveAspectRatio="none"
    className="w-full h-full"
  >
    <path
      d="M0,20 C150,0 350,50 500,20 L500,50 L0,50 Z"
      fill="hsl(var(--primary))"
      opacity="0.2"
    />
  </svg>
</div>


    </>
  );
};

export default AboutUs;
