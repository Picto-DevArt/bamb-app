import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sticky-bottom-cta.css";

function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // La barra solo funciona en la página de inicio.
    if (location.pathname !== "/") {
      setIsVisible(false);
      return;
    }

    // Mostrar la barra cuando el usuario baje por la página.
    function handleScroll() {
      setIsVisible(window.scrollY > 150);
    }

    // Comprobar también la posición inicial del scroll.
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Limpiar el evento al salir de la página.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // No renderizar la barra cuando no corresponde.
  if (location.pathname !== "/" || !isVisible) {
    return null;
  }

  return (
    <aside className="sticky-bottom-cta">
      <Link
        to="/comprar-tarjeta"
        className="sticky-bottom-cta__button"
      >
        COMPRAR TARJETA BAMB
      </Link>
    </aside>
  );
}

export default StickyBottomCTA;