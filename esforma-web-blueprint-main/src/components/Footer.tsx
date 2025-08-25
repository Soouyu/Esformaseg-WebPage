import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import esformasegLogo from "@/assets/esformaseg-logo.png";
import { useNearestSede } from "@/hooks/useNearestSede";

const Footer = () => {
  const nearest = useNearestSede();

  const quickLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Sobre nosotros", href: "#sobre" },
    { name: "Servicios", href: "#servicios" },
    { name: "Casos de uso", href: "#casos" },
    { name: "Contacto", href: "#contacto" },
  ];

  const services = [
    "Portación de Armas",
    "Métodos de Pacificación",
    "Vigilancia Privada",
    "Seguridad Personal",
    "Actualización Profesional",
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={esformasegLogo} alt="Esformaseg" className="h-12 w-12" />
              <span className="text-2xl font-bold text-white">Esformaseg</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Centro de Formación de Personal de Vigilancia y Seguridad Privada.
              Entrenamiento del más alto nivel con certificaciones oficiales.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1Ce6CyUrh6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-primary p-3 rounded-lg transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/esformasegec?igsh=dGZubWJ1YWhuNHNv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-primary p-3 rounded-lg transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@esformasegec?_t=ZM-8yQ35yY1vb6&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-primary p-3 rounded-lg transition-colors duration-300"
                aria-label="TikTok"
              >
                {/* TikTok Icon SVG inline */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.728 0h3.325a5.614 5.614 0 0 0 5.614 5.614v3.21a8.826 8.826 0 0 1-5.614-1.937v8.82a6.755 6.755 0 1 1-6.755-6.755 6.65 6.65 0 0 1 1.407.15v3.4a3.356 3.356 0 1 0 3.356 3.356V0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          {/* Cursos completos desde sección Servicios */}
<div>
  <h3 className="text-xl font-bold mb-6 text-white">Nuestros Cursos</h3>
  <ul className="space-y-3">
    {[
      "Curso de Guardia de Vigilancia y Seguridad Privada (Fijo)",
      "Curso de Guardia de Seguridad Privada (Móvil)",
      "Cursos de Reentrenamiento",
      "Supervisores de Seguridad Privada",
      "Manejo de Consolas",
      "Cursos de Especialización Adicional"
    ].map((course) => (
      <li key={course}>
        <span className="text-white/80 text-sm leading-snug block">{course}</span>
      </li>
    ))}
  </ul>
</div>


          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/80">
                  {nearest.direccion}<br />
                  {nearest.ciudad}, Ecuador
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/80">+593 2 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/80">info@esformaseg.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-white/60 mb-4 md:mb-0">
              © 2024 Esformaseg. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-primary transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors duration-300">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
