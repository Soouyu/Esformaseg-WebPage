import { Shield, Users, Award, ArrowDown,BookOpenCheck,
  Handshake,CheckCircle,Gavel,
  MessagesSquare, Binoculars,Wrench,ActivitySquare,AlertTriangle,Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import logoEcuador from '@/assets/logo-ecuador-hero.png'
import esformasegLogo from "@/assets/esformaseg-logo.png";
// añade esta línea con tus otros imports


import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Calendar, Clock, MapPin } from "lucide-react";
import instructorVideo from '@/assets/instructor.mp4';
import  escudo from "@/assets/escudo-mensaje.gif"
import videoFondo from "@/assets/hero-background.mp4"
import React from "react";
import { motion } from "framer-motion";
import fontoMeto from '@/assets/cartographer.png'
import fondo2 from '@/assets/fondo2.png'
import tiro from '@/assets/fondo-tiro.jpg'

const Hero = () => {
  const navigateToPage = (href: string) => {
    window.location.href = href;
  };

  // valores finales
const targets = { students: 9600, years: 10, courses: 480, schools: 4 };

const iconMap: Record<string, React.ElementType> = {
  Gavel: Gavel,
  Shield: Shield,
  BookOpenCheck: BookOpenCheck,
  Users: Users,
  AlertTriangle: AlertTriangle,
  Award: Award
};

  // estados animados
  const [students, setStudents] = useState(0);
  const [years, setYears] = useState(0);
  const [courses, setCourses] = useState(0);
  const [schools, setSchools] = useState(0);

  // ref a la sección de métricas
  const metricsRef = useRef<HTMLElement>(null);
  // para que sólo arranquemos 1 vez
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    if (!metricsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
          // animación de contadores
          const duration = 3000;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            setStudents(Math.floor(t * targets.students));
            setYears(Math.floor(t * targets.years));
            setCourses(Math.floor(t * targets.courses));
            setSchools(Math.floor(t * targets.schools));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // se dispara cuando el 30% de la sección sea visible
    );

    observer.observe(metricsRef.current);

    return () => observer.disconnect();
  }, [hasCounted]);

  const highlights = [
    {
      icon: Shield,
      title: "Portación de Armas",
      description: "Certificación oficial para el manejo responsable de armas de fuego"
    },
    {
      icon: Users,
      title: "Métodos de Pacificación",
      description: "Técnicas profesionales de control y resolución de conflictos"
    },
    {
      icon: Award,
      title: "Vigilancia Privada",
      description: "Formación integral en seguridad y protección de personas y bienes"
    }
  ];

  return (
    <>
<motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 0.8, ease: "easeInOut" }}
  ></motion.div>
<section
  id="inicio"
  className="full-bleed min-h-[120vh] flex items-start hero-overlap"
>


  {/* Video de fondo (sin cambios) */}
<video
  className="absolute inset-0 object-cover w-full video-hero-extend"
  src={videoFondo}
  autoPlay
  muted
  loop
/>

<div className="absolute inset-0 bg-gradient-to-br from-security-dark/60 via-security-dark/80 to-primary/ video-blur-extend" />



  {/* Contenido con animaciones */}
  <div className="relative z-10 w-full px-4 py-8 sm:px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center text-white w-full">
      {/* Logo and Brand */}
      <AnimateOnScroll delay={0}>
  <div className="flex justify-center mb-0">
    <motion.img
      src={esformasegLogo}
      alt="Esformaseg"
      layoutId="logo"
      className="h-24 w-24 xs:h-24 xs:w-24 sm:h-20 sm:w-20 md:h-32 md:w-32 sm:mt-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
    />
  </div>
</AnimateOnScroll>
      <AnimateOnScroll delay={0.2}>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="text-white">Esformaseg</span>
        </h1>
      </AnimateOnScroll>
      
      <AnimateOnScroll delay={0.3}>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 text-white/90 font-medium">
          Entrenamiento del más alto nivel
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.4}>
        <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
          Centro de Formación en Vigilancia y Seguridad Privada
          <br>
          </br>
          "Formamos profesionales altamente capacitados y con certificaciones oficiales".
        </p>
      </AnimateOnScroll>
      

      {/* Call to Action Buttons */}
      <AnimateOnScroll delay={0.5}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-white hover:text-primary text-white font-semibold px-6 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigateToPage("/servicios")}
          >
            Conoce nuestros cursos
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigateToPage("/contacto")}
          >
            Contáctanos
          </Button>
        </div>
      </AnimateOnScroll>

      {/* Service Highlights */}
      <AnimateOnScroll delay={0.6}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 sm:mt-0 card-highlight-container">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 ${
                index === 2 ? "vigilancia-center" : ""
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/20 shadow-[0_0_10px_rgba(255,0,0,0.3)]">
  <highlight.icon className="h-8 w-8 text-white drop-shadow-md" />
</div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
       {highlight.title}
     </h3>
                <p className="text-white/80 text-sm">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.7}>
        <button
          onClick={() => document.querySelector("#sobre")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-12 animate-bounce text-white mx-auto block"
        >
          <ArrowDown size={32} />
        </button>
      </AnimateOnScroll>
    </div>
  </div>

  {/* Sello institucional (sin animación) */}
  <div className="hidden sm:flex absolute bottom-2 right-2 items-center gap-2 px-2 py-1 logo-ecuador">
    <img src={logoEcuador} alt="Sello Esformaseg" className="h-24 w-auto" />
    <div className="text-white text-xs leading-tight drop-shadow-sm">
      <p className="font-semibold">Centro de Formación Autorizado</p>
      <p>Acuerdo Ministerial No. 0091</p>
    </div>
  </div>
</section>



  <section
  id="cursos"
  ref={metricsRef}
  className="py-16 bg-gray-50"
>
  <h2 className="text-3xl font-bold text-center mb-8 title-track-adjust">
    Nuestra Trayectoria
  </h2>

  <div className="container mx-auto flex flex-col md:flex-row justify-around items-center gap-12 flex-wrap">
    {/* Alumnos formados */}
    <div className="text-center w-full sm:w-auto">
      <div className="text-5xl font-bold text-primary">
        {students}+
      </div>
      <div className="mt-1 text-gray-700">Alumnos formados</div>
    </div>

    {/* Años de experiencia */}
    <div className="text-center w-full sm:w-auto">
      <div className="text-5xl font-bold text-primary">
        {years}+
      </div>
      <div className="mt-1 text-gray-700">Años de experiencia</div>
    </div>

    {/* Cursos impartidos */}
    <div className="text-center w-full sm:w-auto">
      <div className="text-5xl font-bold text-primary">
        {courses}+
      </div>
      <div className="mt-1 text-gray-700">Cursos impartidos</div>
    </div>

    {/* Escuelas activas */}
      <div className="text-center w-full sm:w-auto">
        <div className="text-5xl font-bold text-primary">
          {schools}+
        </div>
        <div className="mt-1 text-gray-700">Escuelas activas</div>
      </div>
    </div>

</section>
<AnimateOnScroll type="fadeInUp" delay={0.1}>
  <section
    id="curso-destreza"
    className="full-bleed relative py-16 px-4 sm:px-6 md:px-12 overflow-hidden"
  >
    {/* Fondo extendido */}
    <div className="absolute inset-0 z-0">
      <img
        src={tiro}
        alt="Tiro al blanco"
        className="w-full h-full object-cover"
      />
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-secondary/80"></div>
    </div>

    {/* Contenido encima del fondo */}
    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">
        ¿Interesado en el manejo de armas de fuego?
      </h2>
      <p className="text-base sm:text-lg text-gray-200">
        Dominio total de armas de fuego para civiles: teoría, práctica y certificación oficial.
      </p>

      {/* Tarjeta estilo “highlight” */}
      <Card className="
        mx-auto flex flex-col md:flex-row overflow-hidden rounded-lg
        bg-white/10 backdrop-blur-sm border border-white/20
        shadow-lg hover:shadow-xl transition-all duration-300
        max-w-3xl
      ">
         {/* Icono con levitación */}
  <motion.div
    className="flex-shrink-0 bg-primary/10 p-6 flex items-center justify-center"
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <Target className="w-12 h-12 text-primary" aria-hidden />
  </motion.div>

        <CardContent className="p-6 flex flex-col flex-1 text-left">
          <h3 className="text-2xl font-semibold text-secondary-foreground mb-2">
            Curso de Destreza de Arma de Fuego
          </h3>
          <p className="text-sm sm:text-base text-secondary-foreground mb-4">
            <strong className="text-primary">48 horas</strong> • Para personas naturales que esten interesados en la defensa personal
          </p>
          <p className="text-sm sm:text-base text-secondary-foreground mb-6 leading-relaxed">
            Aprende desde fundamentos teóricos hasta prácticas seguras y responsables, avaladas por la Policía Nacional.
          </p>

          <h4 className="text-base sm:text-lg font-medium text-secondary-foreground mb-2">Requisitos:</h4>
          <ul className="list-disc list-inside text-sm sm:text-base text-secondary-foreground space-y-2 mb-6">
            <li>Tener al menos 25 años de edad</li>
            <li>Certificado biométrico por la Policía Nacional</li>
            <li>Evaluación psiquiátrica y psicología forense</li>
            <li>Certificado toxicológico psicológico</li>
            <li>No contar con sentencias ni denuncias familiares</li>
            <li>No tener antecedentes penales</li>
          </ul>

          <Button
            size="lg"
            className="mt-auto self-start bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3"
            onClick={() => window.location.href = "/servicios#curso-destreza"}
          >
            Mas informacion
          </Button>
        </CardContent>
      </Card>
    </div>
  </section>
</AnimateOnScroll>


<section
  id="aprendizaje"
  className="full-bleed py-20 bg-[linear-gradient(135deg,hsl(220,15%,15%),hsl(220,15%,10%))] relative overflow-hidden"
>
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
      Lo que aprenderás
    </h2>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Curso Nivel 1",
          desc: "Legislación en seguridad, defensa personal, primeros auxilios y manejo básico de armas.",
          icon: "Gavel",
          highlight: "Certificado SICOSEP",
          extra: "Duración: 1 mes. Requiere título de bachiller y no tener antecedentes penales.",
        },
        {
          title: "Curso Nivel 2",
          desc: "Escoltas VIP, custodia de valores, seguridad en eventos y transporte de carga crítica.",
          icon: "Shield",
          highlight: "Certificado por el Ministerio",
          extra: "Requiere aprobar el Nivel 1 y no tener denuncias intrafamiliares.",
        },
        {
          title: "Manejo de Armas para Civiles",
          desc: "Curso obligatorio para porte de armas. Incluye práctica real y requisitos legales.",
          icon: "BookOpenCheck",
          highlight: "48h de entrenamiento",
          extra: "Evaluación psicológica y toxicológica. Certificado biométrico.",
        },
        {
          title: "Control de Eventos",
          desc: "Normativa legal, primeros auxilios, control de multitudes y amenazas.",
          icon: "Users",
          highlight: "Nivel 1 – 30h",
          extra: "Incluye uso de armas no letales y comunicación en eventos.",
        },
        {
          title: "Seguridad en Bares",
          desc: "Riesgos, evacuación, amenazas, extintores, robos y protocolo ante conflictos.",
          icon: "AlertTriangle",
          highlight: "Nivel 1 – 60h",
          extra: "Manejo de amenazas de atentados y situaciones críticas.",
        },
        {
          title: "Seguridad Financiera",
          desc: "Perfiles sospechosos, armas no letales, reacción ante asaltos.",
          icon: "Award",
          highlight: "Nivel 1 – 40h",
          extra: "Procedimientos en instituciones financieras y coordinación policial.",
        },
      ].map((item, i) => {
        const Icon = iconMap[item.icon];
        return (
          <AnimateOnScroll key={i} delay={i * 0.1} type="fadeInScale">
            <div className="flip-card h-80">
              <div className="flip-inner">

                {/* Frente */}
                <div className="flip-front text-white flex flex-col justify-between p-6 rounded-xl border border-white/10 shadow-md backdrop-blur-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-primary/20 shadow-inner">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                  <div className="mt-4 text-sm text-primary font-semibold text-center">
                    {item.highlight}
                  </div>
                </div>

                {/* Reverso */}
                <div className="flip-back text-white relative overflow-hidden flex flex-col justify-center items-center p-6 rounded-xl border border-white/10 shadow-md backdrop-blur-md">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="text-white/5 w-32 h-32" />
                  </div>
                  <div className="relative z-10 text-center px-4">
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-white/80 leading-snug">{item.extra}</p>
                  </div>
                </div>

              </div>
            </div>
          </AnimateOnScroll>
        );
      })}
    </div>
  </div>
</section>

<section
  id="metodologia"
  className="full-bleed py-20 relative overflow-hidden bg-gradient-to-br from-[#f4f7fa] to-[#edf2f7]"
>
  {/* Fondo decorativo SVG (opcionales, puedes personalizar más tarde) */}
  <div className="absolute inset-0 pointer-events-none">
    <img
      src={fontoMeto}
      alt="Decoración fondo"
      className="w-full h-full object-cover opacity-20"
    />
  </div>

  <div className="max-w-6xl mx-auto px-4 flex flex-col gap-16 relative z-10">
    {/* Video y texto */}
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <AnimateOnScroll type="fadeInScale" delay={0.2}>
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
          <video
            src={instructorVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll type="fadeInRight" delay={0.2}>
        <div className="text-center md:text-left flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Nuestra Metodología
          </h2>

          <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
            Nuestra formación combina <strong>teoría y praxis</strong> con métodos activos,
            respondiendo a problemas reales en contextos profesionales. Guiamos a los estudiantes a
            través de un <strong>aprendizaje vivencial</strong>, práctico y orientado a la acción.
          </p>
          <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
            Este enfoque permite que el conocimiento no solo se comprenda, sino que también se aplique
            en situaciones reales. El estudiante se convierte en protagonista de su aprendizaje,
            enfrentando desafíos concretos en un entorno guiado y seguro.
          </p>

          <ul className="space-y-3 text-base text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              <span>Actividades que promueven participación activa y pensamiento crítico.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              <span>Se valora el contexto y experiencia de cada estudiante.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              <span>Formación alineada con los estándares del Ministerio del Interior.</span>
            </li>
          </ul>
        </div>
      </AnimateOnScroll>
    </div>

    {/* Métodos y botones */}
    <AnimateOnScroll type="fadeInUp" delay={0.3}>
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[
            { label: "Método Deductivo", desc: "Se parte de la teoría para aplicarla a casos prácticos." },
            { label: "Método Inductivo", desc: "Se extraen aprendizajes desde experiencias reales." },
            { label: "Método Analítico", desc: "Se descompone un problema para comprenderlo." },
            { label: "Método Dialéctico", desc: "Debate entre ideas opuestas para llegar a acuerdos." },
            { label: "Método Sintético", desc: "Integra conocimientos para resolver situaciones complejas." },
          ].map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-md transition-all"
            >
              <h4 className="text-primary font-semibold text-lg mb-3">{m.label}</h4>

               <p className="text-base text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-white px-8 py-3 text-base font-semibold hover:bg-primary/90"
            onClick={() => window.location.href = "/servicios"}
          >
            Ver Cursos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary px-8 py-3 text-base font-semibold hover:bg-primary hover:text-white"
            onClick={() => window.location.href = "/contacto"}
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </AnimateOnScroll>
  </div>
</section>

<section className="full-bleed py-24 bg-gradient-to-br from-[#f7f9fb] to-[#edf2f7] relative overflow-hidden">

  {/* Fondo decorativo con fondo2 */}
  <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
    <img
      src={fondo2}
      alt="Decoración fondo"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="max-w-6xl mx-auto px-4 flex flex-col gap-16 relative z-10">
    
    {/* Título General */}
    <AnimateOnScroll type="fadeInUp" delay={0.1}>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">Requisitos por Nivel</h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Todos los aspirantes deben cumplir con los requisitos legales actualizados.
          Si realizaste el Nivel 1 hace años, <strong>deberás presentar nuevamente toda la documentación requerida</strong> para acceder al Nivel 2, según la Ley Orgánica de Vigilancia y Seguridad Privada.
        </p>
      </div>
    </AnimateOnScroll>

    {/* Tarjetas por Nivel */}
    <div className="grid md:grid-cols-2 gap-10">

      {/* Nivel 1 */}
      <AnimateOnScroll type="fadeInLeft" delay={0.2}>
        <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-l-[4px] border-primary">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-primary">Nivel 1 – Formación Básica</h3>
          </div>
          <span className="text-sm bg-primary text-white px-3 py-1 rounded-full mb-4 inline-block">Duración: 1 mes</span>
          <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
            <li>Título de Bachiller obligatorio</li>
            <li>No tener antecedentes penales</li>
            <li>No tener denuncias por maltrato intrafamiliar</li>
          </ul>
        </div>
      </AnimateOnScroll>

      {/* Nivel 2 */}
      <AnimateOnScroll type="fadeInRight" delay={0.3}>
        <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-l-[4px] border-red-500">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-semibold text-red-500">Nivel 2 – Especializaciones</h3>
          </div>
         <span className="text-sm bg-primary text-white px-3 py-1 rounded-full mb-4 inline-block">Duración: 1 mes</span>
          <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
            <li>Tener mínimo 18 años</li>
            <li>Haber aprobado el Nivel 1</li>
            <li>Título de Bachiller obligatorio</li>
            <li>No tener sentencia ejecutoriada</li>
            <li>Certificado de no tener denuncias intrafamiliares</li>
            <li>Certificado actualizado de antecedentes penales</li>
          </ul>
        </div>
      </AnimateOnScroll>

    </div>
  </div>
</section>

   
    </>
  );
};

export default Hero;