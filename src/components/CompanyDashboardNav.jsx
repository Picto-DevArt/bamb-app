
import { Link, useNavigate } from "react-router-dom";

function CompanyDashboardNav() {
  const navigate = useNavigate();

  function handleLogout() {
    // Todavía no hay autenticación real.
    // Más adelante cerraremos la sesión de Firebase aquí.
    navigate("/login");
  }

  return (
    <nav className="company-bottom-nav" aria-label="Menú de empresa">
      <Link to="/empresa/cuenta">
        Datos de tu cuenta
      </Link>

      <Link to="/empresa/desactivacion">
        Desactivación de cuenta
      </Link>

      <Link to="/empresa/soporte">
        Soporte
      </Link>

      <button
        type="button"
        className="company-logout"
        onClick={handleLogout}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
        </svg>
        <span>Cerrar sesión</span>
      </button>
    </nav>
  );
}

export default CompanyDashboardNav;
