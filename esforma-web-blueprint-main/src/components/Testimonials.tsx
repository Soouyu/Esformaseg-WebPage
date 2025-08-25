import { Star, Quote, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      position: "Jefe de Seguridad - Corporación Favorita",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "La formación en Esformaseg transformó completamente mi carrera. Los instructores son excepcionales y el contenido está actualizado con las mejores prácticas internacionales."
    },
    {
      name: "María Elena Vásquez",
      position: "Supervisora de Seguridad - Mall del Sol",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Excelente centro de formación. El curso de métodos de pacificación me dio las herramientas necesarias para manejar situaciones complejas de manera profesional."
    },
    {
      name: "Roberto Chávez",
      position: "Escolta Ejecutivo",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "La certificación de portación de armas fue completa y rigurosa. Me siento completamente preparado y seguro en mi trabajo gracias a esta formación."
    }
  ];

  const caseStudies = [
    {
      title: "Reducción de Incidentes en 85%",
      client: "Centro Comercial Importante",
      objective: "Mejorar la seguridad y reducir incidentes",
      solution: "Capacitación integral del equipo de seguridad en técnicas de vigilancia y métodos de pacificación",
      result: "Reducción del 85% en incidentes reportados y mejora significativa en la satisfacción de clientes",
      icon: CheckCircle
    },
    {
      title: "Equipo de Élite Formado",
      client: "Empresa de Seguridad Privada",
      objective: "Formar un equipo especializado en protección ejecutiva",
      solution: "Programa intensivo de 6 meses con certificaciones múltiples",
      result: "15 profesionales certificados ahora protegen ejecutivos de alto perfil con 100% de efectividad",
      icon: CheckCircle
    },
    {
      title: "Actualización Normativa",
      client: "50+ Guardias de Seguridad",
      objective: "Actualizar conocimientos según nuevas normativas",
      solution: "Curso de actualización profesional de 40 horas",
      result: "100% de aprobación en recertificación oficial y cumplimiento normativo total",
      icon: CheckCircle
    }
  ];

  return (
    <section id="casos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Casos de Éxito y Testimonios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestros graduados destacan en el sector de seguridad, transformando su carrera profesional
          </p>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Lo que dicen nuestros graduados
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-primary/30 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Estudios de Caso
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 border border-border/50">
                <CardContent className="p-6">
                  <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <study.icon className="h-6 w-6 text-accent" />
                  </div>
                  
                  <h4 className="text-xl font-bold mb-3 text-foreground">{study.title}</h4>
                  <p className="text-sm text-primary font-medium mb-4">{study.client}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-foreground">Objetivo: </span>
                      <span className="text-muted-foreground">{study.objective}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Solución: </span>
                      <span className="text-muted-foreground">{study.solution}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Resultado: </span>
                      <span className="text-muted-foreground">{study.result}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;