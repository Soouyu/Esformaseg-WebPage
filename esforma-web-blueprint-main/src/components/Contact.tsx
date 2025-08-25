import { useEffect, useRef, useState } from "react";
import {
  MapPin, Phone, Mail, Clock, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { toast } from "sonner";

// 👇 FIX: asegúrate de que venga desde hooks, no desde components
import { useNearestSede } from "@/hooks/useNearestSede";
import NearestLocation from "@/components/NearestLocation";
import type { Location } from "@/hooks/useNearestSede";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [sending, setSending] = useState(false);

  const timers = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  const phoneRegex = /^09\d{8}$/;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const nameRegex = /^[A-Za-zÀ-ſ ]{3,50}$/;

  // Hook de sede más cercana (devuelve un Location)
  const nearest = useNearestSede();

  // Validador por campo
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return !value
          ? "El nombre es obligatorio."
          : !nameRegex.test(value)
          ? "Debe tener entre 3 y 50 letras sin símbolos ni números."
          : "";
      case "email":
        return !value
          ? "El correo es obligatorio."
          : !emailRegex.test(value)
          ? "El correo no es válido."
          : "";
      case "phone":
        return !value
          ? "El teléfono es obligatorio."
          : !phoneRegex.test(value)
          ? "Debe comenzar con 09 y tener 10 dígitos."
          : "";
      default:
        return "";
    }
  };

  // OnChange con validación diferida
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // debounce de validación
    clearTimeout(timers.current[name]);
    timers.current[name] = setTimeout(() => {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
      if (error) {
        const label =
          name === "name" ? "nombre" : name === "email" ? "email" : name === "phone" ? "teléfono" : name;
        toast.error(`Error en ${label}`, { description: error, duration: 20000 });
      }
    }, 500);
  };

  // Precarga curso guardado y scroll a #contacto
  useEffect(() => {
    const savedCourse = localStorage.getItem("cursoSeleccionado");
    if (savedCourse) {
      setFormData(prev => ({ ...prev, course: savedCourse }));
      localStorage.removeItem("cursoSeleccionado");
    }
    if (window.location.hash === "#contacto") {
      setTimeout(() => {
        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, []);

  // Submit: valida → arma destinatario por sede → envía Brevo
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = {
    name: validateField("name", formData.name),
    email: validateField("email", formData.email),
    phone: validateField("phone", formData.phone),
  };
  setErrors(newErrors);
  const hasErrors = Object.values(newErrors).some(Boolean);
  if (hasErrors) {
    Object.entries(newErrors).forEach(([key, msg]) => {
      if (msg) toast.error(`Error en ${key}`, { description: msg, duration: 20000 });
    });
    return;
  }

  const adminEmail = nearest?.email || import.meta.env.VITE_BREVO_FALLBACK_ADMIN_EMAIL;
  const payload = {
    to: [{ email: adminEmail, name: `Esformaseg – ${nearest?.ciudad ?? "Sede"}` }],
    replyTo: { email: formData.email, name: formData.name },
    templateId: Number(import.meta.env.VITE_BREVO_TEMPLATE_ID),
    params: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      message: formData.message,
      source_city: nearest?.ciudad ?? "No detectada",
      source_page: window.location.href,
      time: new Date().toLocaleString(),
    },
  };

  const isDryRun = String(import.meta.env.VITE_EMAIL_DRY_RUN).toLowerCase() === "true";

  if (isDryRun) {
    console.log("[EMAIL DRY-RUN] Payload que se enviaría a Brevo:", payload);
    toast.info("Preview del email (dry-run activado)", {
      description: `Para: ${adminEmail} | Reply-To: ${formData.email}`,
      duration: 12000,
    });
    return;
  }

  try {
    setSending(true);
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": import.meta.env.VITE_BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.message || "No se pudo enviar el correo");
    }

    toast.success("¡Mensaje enviado!", {
      description: "Nos pondremos en contacto contigo en las próximas 24 horas",
      duration: 20000,
    });

    setFormData({ name: "", email: "", phone: "", course: "", message: "" });
    setErrors({ name: "", email: "", phone: "" });
  } catch (error: any) {
    console.error("Brevo error:", error);
    toast.error("Error al enviar", { description: error?.message || "Intenta de nuevo" });
  } finally {
    setSending(false);
  }
};


  // Datos de la tarjeta lateral
  const contactInfo = [
    { icon: MapPin, title: "Ubicación", content: `${nearest.direccion}, ${nearest.ciudad}, Ecuador` },
    { icon: MessageCircle, title: "WhatsApp", content: nearest.whatsapp },
    { icon: Mail, title: "Email", content: nearest.email },
    { icon: Clock, title: "Horarios", content: `Lun - Vie: ${nearest.horarios}` }
  ];

  const courses = [
    "Curso de Guardia de Vigilancia y Seguridad Privada (Fijo)",
    "Curso de Guardia de Seguridad Privada (Móvil)",
    "Cursos de Reentrenamiento",
    "Supervisores de Seguridad Privada",
    "Manejo de Consolas",
    "Cursos de Especialización Adicional",
    "Curso de Destreza de Arma de Fuego",
    "Control de Eventos Públicos y Escenarios Deportivos Nivel 1",
    "Seguridad en Bares y Eventos Nivel 1",
    "Custodia y Transporte de Valores Nivel 2",
    "Escoltas VIP Nivel 2",
    "Carga Crítica Nivel 2",
    "Seguridad Financiera Nivel 1",
    "Cotización Personalizada"
  ];

  return (
    <section id="contacto" className="py-8 sm:py-12 md:py-20 bg-background">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <AnimateOnScroll type="rotateReveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-foreground">
              Contacto e Inscripción
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll type="slideInSkew" delay={0.1}>
            <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              ¿Listo para comenzar tu formación profesional? Contáctanos y obtén toda la información
            </p>
          </AnimateOnScroll>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 md:gap-12">
          <AnimateOnScroll type="zoomBounce" delay={0.2}>
            <Card className="border border-border/50 shadow-md sm:shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  Formulario de Inscripción
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Completa el formulario y nos pondremos en contacto contigo
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
                  <div className="grid gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="name" className="text-xs sm:text-sm">Nombre completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        ref={nameInputRef}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        maxLength={50}
                        className={`mt-1 text-xs sm:text-sm h-8 sm:h-10 ${errors.name && "border-red-500"}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs sm:text-sm">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className={`mt-1 text-xs sm:text-sm h-8 sm:h-10 ${errors.email && "border-red-500"}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs sm:text-sm">Teléfono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="099 123 4567"
                        maxLength={10}
                        inputMode="numeric"
                        className={`mt-1 text-xs sm:text-sm h-8 sm:h-10 ${errors.phone && "border-red-500"}`}
                        onKeyDown={(e) => {
                          const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
                          const isNumber = /^[0-9]$/.test(e.key);
                          if (!isNumber && !allowedKeys.includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="course" className="text-xs sm:text-sm">Curso de interés</Label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm border border-input bg-background rounded-md text-foreground h-8 sm:h-10"
                      >
                        <option value="">Selecciona un curso</option>
                        {courses.map((course) => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs sm:text-sm">Mensaje adicional</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos más sobre tu interés en nuestros cursos..."
                      rows={3}
                      maxLength={300}
                      className="mt-1 text-xs sm:text-sm"
                    />
                    <p className="text-xs text-muted-foreground text-right mt-1">
                      {formData.message.length}/300
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Enviar solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>

            {nearest.imagenCiudad && (
  <AnimateOnScroll type="fadeInUp" delay={0.5}>
    <div className="w-full max-w-3xl mx-auto mt-8">
      <img
        src={nearest.imagenCiudad}
        alt={`Vista de ${nearest.ciudad}`}
        className="w-full rounded-xl shadow-xl object-cover max-h-[400px]"
      />
      <p className="text-center text-sm sm:text-base text-muted-foreground mt-2">
        Vista representativa de <strong>{nearest.ciudad}</strong>
      </p>
    </div>
  </AnimateOnScroll>
)}
          </AnimateOnScroll>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <AnimateOnScroll type="fadeInLeft" delay={0.3}>
              <Card className="border border-border/50 shadow-md sm:shadow-lg">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                    Información de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-2 sm:space-x-4">
                      <div className="bg-primary/10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-xs sm:text-sm md:text-base mb-1">
                          {info.title}
                        </h4>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AnimateOnScroll>

          <AnimateOnScroll type="flipInY" delay={0.4}>
            <NearestLocation />
          </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;