// src/components/ui/Navigation.tsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import esformasegLogo from "@/assets/esformaseg-logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    const isOnInternalPage = ["/sobre-nosotros", "/servicios", "/contacto"].includes(window.location.pathname);
    const hasScrolled = window.scrollY > 50;
    setIsScrolled(isOnInternalPage || hasScrolled);
  };



  handleScroll();
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Sobre nosotros", href: "/sobre-nosotros" },
    { name: "Servicios", href: "/servicios" },
    { name: "Contacto", href: "/contacto" },
  ];

  
  const isMobileMenuActive = isMenuOpen && window.innerWidth < 768;

  const navigateToPage = (href: string) => {
    window.location.href = href;
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${(isScrolled || isMobileMenuActive)
          ? "bg-white text-black shadow-lg border-b border-border"
          : "bg-transparent text-white"}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[var(--nav-h)]">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={esformasegLogo}
              alt="Esformaseg"
              className="h-10 w-10"
            />
            <span
              className={`font-bold text-xl transition-colors duration-300 ${
                (isScrolled || isMobileMenuActive) ? "text-black" : "text-white"
              }`}
            >
              Esformaseg
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateToPage(item.href)}
                className={`font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-black hover:text-primary"
                    : "text-white hover:text-primary"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X
                size={24}
                className={`transition-colors duration-300 ${
                  (isScrolled || isMobileMenuActive) ? "text-black" : "text-white"
                }`}
              />
            ) : (
              <Menu
                size={24}
                className={`transition-colors duration-300 ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden transition-colors duration-300 ${
              isScrolled
                ? "bg-background/95 border-t border-border"
                : "bg-transparent"
            }`}
          >
            <div className="py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigateToPage(item.href)}
                  className={`block w-full text-left px-4 py-2 font-medium transition-colors ${
                    (isScrolled || isMobileMenuActive)
                      ? "text-black hover:text-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
