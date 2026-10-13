
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import OffersCarousel from "../components/OffersCarousel";
import "../styles/register-client.css";

function RegisterClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false,
    acceptDataPolicy: false,
  });

  const canSubmit =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.length >= 8 &&
    formData.acceptTerms &&
    formData.acceptDataPolicy;

  // Actualiza los campos y las casillas del formulario.
  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Por ahora validamos el formulario sin crear una cuenta real.
  function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) return;

    alert(
      "Formulario validado. Próximamente conectaremos el registro."
    );
  }

  return (
    <>
      <Header />

      <main className="register-client">
        <div className="register-client__top">
          <Link to="/" className="register-client__back">
            ← Regresar a la Home
          </Link>
        </div>

        <section
          className="register-client__content"
          aria-labelledby="register-client-title"
        >
          <h1 id="register-client-title">
            CREA TU CUENTA DE CLIENTE
          </h1>

          <form
            className="register-client__form"
            onSubmit={handleSubmit}
          >
            <div className="register-client__field">
              <label htmlFor="clientName">Nombre</label>
              <input
                id="clientName"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-client__field">
              <label htmlFor="clientEmail">
                Dirección de correo electrónico
              </label>
              <input
                id="clientEmail"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register-client__field">
              <label htmlFor="clientPassword">
                Crea tu contraseña
              </label>
              <input
                id="clientPassword"
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

            <div className="register-client__consents">
              <label className="register-client__checkbox">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                <span>Acepta términos y condiciones</span>
              </label>

              <label className="register-client__checkbox">
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
              className="register-client__submit"
              disabled={!canSubmit}
            >
              Crear cuenta
            </button>
          </form>
        </section>

        <section
          className="register-client__offers"
          aria-label="Carrusel de ofertas"
        >
          <OffersCarousel />
        </section>
      </main>
    </>
  );
}

export default RegisterClient;
