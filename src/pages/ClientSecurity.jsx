import { useState } from "react";
import { Link } from "react-router-dom";
import ClientDashboardHeader from "../components/ClientDashboardHeader";
import "../styles/client-account.css";

function ClientSecurity() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (form.newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("La nueva contraseña y su confirmación no coinciden.");
      return;
    }
    setMessage("La validación del formulario está lista. Para cambiar la contraseña de verdad, debemos conectar la autenticación segura.");
    setError("");
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  return (
    <>
      <ClientDashboardHeader />
      <main className="client-account-page client-security-page">
        <Link className="client-account-back" to="/cliente/cuenta">← Volver a mi cuenta</Link>
        <header className="client-account-heading">
          <p className="client-account-eyebrow">MI CUENTA BAMB</p>
          <h1>Seguridad de la cuenta</h1>
          <p>Administra la contraseña de acceso a tu cuenta.</p>
        </header>

        <form className="client-account-form" onSubmit={handleSubmit}>
          <div className="client-account-fields client-security-fields">
            <label>Contraseña actual
              <input name="currentPassword" type="password" autoComplete="current-password" value={form.currentPassword} onChange={handleChange} required />
            </label>
            <label>Nueva contraseña
              <input name="newPassword" type="password" autoComplete="new-password" minLength={8} value={form.newPassword} onChange={handleChange} required />
              <small>Utiliza al menos 8 caracteres.</small>
            </label>
            <label className="client-account-full">Confirmar nueva contraseña
              <input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} value={form.confirmPassword} onChange={handleChange} required />
            </label>
          </div>
          {error && <p className="client-account-error" role="alert">{error}</p>}
          {message && <p className="client-account-message" role="status">{message}</p>}
          <button className="client-account-submit" type="submit">Validar cambios</button>
        </form>
      </main>
    </>
  );
}

export default ClientSecurity;
