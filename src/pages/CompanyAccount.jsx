import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyDashboardHeader from "../components/CompanyDashboardHeader";
import CompanyDashboardNav from "../components/CompanyDashboardNav";
import "../styles/company-account.css";

const STORAGE_KEY = "bamb-company-profile";
const categories = [
  "Tecnología",
  "Comida",
  "Regalos",
  "Salud y cuidado",
  "Entretenimiento y diversión",
  "Mascotas",
];

const emptyProfile = {
  companyName: "",
  category: "",
  email: "",
  whatsapp: "",
  address: "",
  socialLinks: "",
};

function CompanyAccount() {
  const [form, setForm] = useState(emptyProfile);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved) setForm({ ...emptyProfile, ...saved });
    } catch {
      setError("No fue posible cargar los datos guardados.");
    }
  }, []);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage("");
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      // Compatibilidad con el nombre que ya usa el encabezado.
      localStorage.setItem("bamb-company-name", form.companyName.trim());
      window.dispatchEvent(new Event("bamb-company-profile-updated"));
      setMessage("Cambios guardados en este navegador.");
      setError("");
    } catch {
      setError("No se pudieron guardar los cambios. Intenta de nuevo.");
    }
  }

  return (
    <>
      <CompanyDashboardHeader />
      <main className="company-account-page">
        <Link className="company-account-back" to="/empresa/dashboard">← Volver al panel</Link>
        <header className="company-account-heading">
          <p className="company-account-eyebrow">MI EMPRESA</p>
          <h1>Editar tu información</h1>
          <p>Actualiza los datos con los que tus clientes conocerán tu empresa.</p>
        </header>

        <form className="company-account-form" onSubmit={handleSubmit}>
          <div className="company-account-photo">
            <div className="company-account-avatar" aria-hidden="true">
              {(form.companyName.trim().charAt(0) || "E").toUpperCase()}
            </div>
            <div>
              <strong>Foto de tu empresa</strong>
              <p>Para cambiar el logo, selecciona el círculo de tu perfil en la barra superior.</p>
            </div>
          </div>

          <div className="company-account-fields">
            <label>Nombre de tu empresa
              <input name="companyName" value={form.companyName} onChange={handleChange} autoComplete="organization" required />
            </label>
            <label>Categoría de tu empresa
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label>Correo electrónico
              <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required />
            </label>
            <label>WhatsApp
              <input name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} autoComplete="tel" placeholder="+57 300 000 0000" />
            </label>
            <label className="company-account-full">Dirección
              <input name="address" value={form.address} onChange={handleChange} autoComplete="street-address" />
            </label>
            <label className="company-account-full">Enlaces a redes sociales
              <textarea name="socialLinks" value={form.socialLinks} onChange={handleChange} rows={3} placeholder="Instagram, Facebook, TikTok o sitio web" />
              <small>Puedes agregar varios enlaces, separados por líneas.</small>
            </label>
          </div>

          {message && <p className="company-account-message" role="status">{message}</p>}
          {error && <p className="company-account-error" role="alert">{error}</p>}
          <button className="company-account-submit" type="submit">Guardar cambios</button>
        </form>

        <section className="company-account-security-link">
          <div><h2>Seguridad de la cuenta</h2><p>¿Necesitas actualizar tu contraseña?</p></div>
          <Link to="/empresa/seguridad">Editar contraseña →</Link>
        </section>
      </main>
      <CompanyDashboardNav />
    </>
  );
}

export default CompanyAccount;
