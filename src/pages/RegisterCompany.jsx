
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import OffersCarousel from "../components/OffersCarousel";
import "../styles/register-company.css";

const categories = [
  "Tecnología",
  "Comida",
  "Regalos",
  "Salud y cuidado",
  "Entretenimiento y diversión",
  "Mascotas",
];

function RegisterCompany() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    category: "",
    password: "",
    acceptTerms: false,
    acceptDataPolicy: false,
  });

  const canSubmit =
    formData.companyName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.category !== "" &&
    formData.password.length >= 8 &&
    formData.acceptTerms &&
    formData.acceptDataPolicy;

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) return;

    // El registro real se conectará más adelante.
    alert("Formulario validado. Próximamente conectaremos el registro.");
  }

  return (
    <>
      <Header />

      <main className="register-company">
        <div className="register-company__top">
          <Link to="/" className="register-company__back">
            ← Regresar a la Home
          </Link>
        </div>

        <section
          className="register-company__content"
          aria-labelledby="register-company-title"
        >
          <h1 id="register-company-title">
            CREA TU CUENTA DE EMPRESA
          </h1>

          <form
            className="register-company__form"
            onSubmit={handleSubmit}
          >
            <div className="register-company__field">
              <label htmlFor="companyName">
                Nombre de tu empresa
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                autoComplete="organization"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-company__field">
              <label htmlFor="companyEmail">
                Dirección de correo electrónico
              </label>
              <input
                id="companyEmail"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-company__field">
              <label htmlFor="companyCategory">
                Categoría de tu empresa
              </label>
              <select
                id="companyCategory"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="register-company__field">
              <label htmlFor="companyPassword">
                Crea tu contraseña
              </label>
              <input
                id="companyPassword"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <small>Mínimo 8 caracteres.</small>
            </div>

            <div className="register-company__consents">
              <label className="register-company__checkbox">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                <span>
                  Acepta términos y condiciones
                </span>
              </label>

              <label className="register-company__checkbox">
                <input
                  type="checkbox"
                  name="acceptDataPolicy"
                  checked={formData.acceptDataPolicy}
                  onChange={handleChange}
                  required
                />
                <span>
                  Acepta política de tratamiento de datos personales
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="register-company__submit"
              disabled={!canSubmit}
            >
              Crear cuenta
            </button>
          </form>
        </section>

        <section
          className="register-company__offers"
          aria-label="Carrusel de ofertas"
        >
          <OffersCarousel />
        </section>
      </main>
    </>
  );
}

export default RegisterCompany;
