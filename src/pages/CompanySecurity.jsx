import { useState } from "react";
import { Link } from "react-router-dom";
import CompanyDashboardHeader from "../components/CompanyDashboardHeader";
import CompanyDashboardNav from "../components/CompanyDashboardNav";
import "../styles/company-account.css";

function CompanySecurity() {
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
    // No se guarda ni se compara ninguna contraseña en localStorage.
    setMessage("La validación del formulario está lista. Para cambiar la contraseña de verdad, primero debemos conectar la autenticación segura.");
    setError("");
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  return (
    <>
      <CompanyDashboardHeader />
      <main className="company-account-page company-security-page">
        <Link className="company-account-back" to="/empresa/cuenta">← Volver a editar información</Link>
        <header className="company-account-heading">
          <p className="company-account-eyebrow">MI EMPRESA</p>
          <h1>Seguridad de la cuenta</h1>
          <p>Administra la contraseña de acceso a tu cuenta.</p>
        </header>

        <form className="company-account-form" onSubmit={handleSubmit}>
          <div className="company-account-fields company-security-fields">
            <label>Contraseña actual
              <input name="currentPassword" type="password" autoComplete="current-password" value={form.currentPassword} onChange={handleChange} required />
            </label>
            <label>Nueva contraseña
              <input name="newPassword" type="password" autoComplete="new-password" minLength={8} value={form.newPassword} onChange={handleChange} required />
              <small>Utiliza al menos 8 caracteres.</small>
            </label>
            <label className="company-account-full">Confirmar nueva contraseña
              <input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} value={form.confirmPassword} onChange={handleChange} required />
            </label>
          </div>
          {error && <p className="company-account-error" role="alert">{error}</p>}
          {message && <p className="company-account-message" role="status">{message}</p>}
          <button className="company-account-submit" type="submit">Guardar cambios</button>
        </form>
      </main>
      <CompanyDashboardNav />
    </>
  );
}

export default CompanySecurity;
