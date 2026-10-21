import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientDashboardHeader from "../components/ClientDashboardHeader";
import "../styles/client-account.css";

const STORAGE_KEY = "bamb-client-profile";
const emptyProfile = { name: "", email: "", whatsapp: "" };

function ClientAccount() {
  const [form, setForm] = useState(emptyProfile);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
      setForm({
        name: saved.name ?? localStorage.getItem("bamb-client-name") ?? "",
        email: saved.email ?? localStorage.getItem("bamb-client-email") ?? "",
        whatsapp: saved.whatsapp ?? localStorage.getItem("bamb-client-whatsapp") ?? "",
      });
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
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const whatsapp = form.whatsapp.trim();

    if (!name || !email || !whatsapp) {
      setError("Completa tu nombre, correo electrónico y WhatsApp.");
      return;
    }

    try {
      const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
      const updatedProfile = { ...previous, name, email, whatsapp, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      localStorage.setItem("bamb-client-name", name);
      localStorage.setItem("bamb-client-email", email);
      localStorage.setItem("bamb-client-whatsapp", whatsapp);
      setForm({ name, email, whatsapp });
      window.dispatchEvent(new Event("bamb-client-profile-updated"));
      setMessage("Tus datos se guardaron en este navegador.");
      setError("");
    } catch {
      setError("No se pudieron guardar los cambios. Intenta de nuevo.");
    }
  }

  return (
    <>
      <ClientDashboardHeader />
      <main className="client-account-page">
        <Link className="client-account-back" to="/cliente/dashboard">← Volver al panel</Link>
        <header className="client-account-heading">
          <p className="client-account-eyebrow">MI CUENTA BAMB</p>
          <h1>Editar mi información</h1>
          <p>Mantén actualizados los datos de tu perfil.</p>
        </header>

        <form className="client-account-form" onSubmit={handleSubmit}>
          <div className="client-account-photo">
            <div className="client-account-avatar" aria-hidden="true">
              {(form.name.trim().charAt(0) || "C").toUpperCase()}
            </div>
            <div>
              <strong>Foto de perfil</strong>
              <p>Para cambiar tu foto, selecciona el círculo de tu perfil en la barra superior.</p>
            </div>
          </div>

          <div className="client-account-fields">
            <label>Nombre completo
              <input name="name" value={form.name} onChange={handleChange} autoComplete="name" required />
            </label>
            <label>Correo electrónico
              <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required />
            </label>
            <label className="client-account-full">WhatsApp
              <input name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} autoComplete="tel" placeholder="+57 300 000 0000" required />
            </label>
          </div>

          {message && <p className="client-account-message" role="status">{message}</p>}
          {error && <p className="client-account-error" role="alert">{error}</p>}
          <button className="client-account-submit" type="submit">Guardar cambios</button>
        </form>

        <section className="client-account-security-link">
          <div><h2>Seguridad de la cuenta</h2><p>¿Necesitas actualizar tu contraseña?</p></div>
          <Link to="/cliente/seguridad">Cambiar contraseña →</Link>
        </section>
      </main>
    </>
  );
}

export default ClientAccount;
