
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Cambia la apariencia del encabezado al desplazarse.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cierra todos los niveles del menú.
  function closeMenu() {
    setMenuOpen(false);
    setCreateAccountOpen(false);
  }

  // Abre o cierra las opciones de creación de cuenta.
  function toggleCreateAccount() {
    setCreateAccountOpen((open) => !open);
  }

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__content">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          Bamb
        </Link>

        <div className="header__account">
          <button
            type="button"
            className="header__account-button"
            aria-expanded={menuOpen}
            aria-controls="header-account-menu"
            onClick={() => {
              setMenuOpen((open) => !open);
              setCreateAccountOpen(false);
            }}
          >
            Cuenta
            <span
              className={`header__arrow ${menuOpen ? "header__arrow--open" : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {menuOpen && (
            <nav
              id="header-account-menu"
              className="header__dropdown"
              aria-label="Opciones de cuenta"
            >
              <div className="header__dropdown-group">
                <button
                  type="button"
                  className="header__dropdown-toggle"
                  aria-expanded={createAccountOpen}
                  onClick={toggleCreateAccount}
                >
                  Crear cuenta
                  <span
                    className={`header__arrow ${
                      createAccountOpen ? "header__arrow--open" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>

                {createAccountOpen && (
                  <div className="header__submenu">
                    <Link to="/registro/empresa" onClick={closeMenu}>
                      Empresa
                    </Link>

                    <Link to="/registro/cliente" onClick={closeMenu}>
                      Cliente
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/login" onClick={closeMenu}>
                Ingresar
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;


