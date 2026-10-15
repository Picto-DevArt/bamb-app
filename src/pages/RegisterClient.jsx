

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OffersCarousel from "../components/OffersCarousel";
import "../styles/register-client.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  whatsapp: "",
  password: "",
  acceptTerms: false,
  acceptDataPolicy: false,
  whatsappConsent: false,
};

// Normaliza el teléfono para aceptar espacios, guiones y paréntesis,
// conservando el indicativo internacional obligatorio.
function normalizeWhatsApp(value) {
  return value.trim().replace(/[\s().-]/g, "");
}

// Validaciones del formulario.
// La comprobación del correo es básica; no verifica que exista.
function validateForm(formData) {
  const errors = {};

  const name = formData.name.trim();
  const email = formData.email.trim().toLowerCase();
  const whatsapp = normalizeWhatsApp(formData.whatsapp);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^\+[1-9]\d{7,14}$/;

  if (!name) {
    errors.name = "Escribe tu nombre.";
  } else if (name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  } else if (name.length > 80) {
    errors.name = "El nombre no puede superar los 80 caracteres.";
  }

  if (!email) {
    errors.email = "Escribe tu correo electrónico.";
  } else if (email.length > 254 || !emailPattern.test(email)) {
    errors.email = "Escribe un correo electrónico válido.";
  }

  if (!whatsapp) {
    errors.whatsapp = "Escribe tu número de WhatsApp.";
  } else if (!phonePattern.test(whatsapp)) {
    errors.whatsapp =
      "Incluye el indicativo internacional, por ejemplo +573001234567.";
  }

  if (!formData.password) {
    errors.password = "Crea una contraseña.";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  } else if (formData.password.length > 128) {
    errors.password = "La contraseña no puede superar los 128 caracteres.";
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms = "Debes aceptar los términos y condiciones.";
  }

  if (!formData.acceptDataPolicy) {
    errors.acceptDataPolicy =
      "Debes aceptar la política de tratamiento de datos.";
  }

  return errors;
}

function RegisterClient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  <button
  type="submit"
  className="register-client__submit"
>
  Crear cuenta
</button>

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const clientProfile = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: normalizeWhatsApp(formData.whatsapp),
      whatsappConsent: formData.whatsappConsent,
      updatedAt: new Date().toISOString(),
    };

    try {
      // Prototipo: guardamos solamente datos de perfil y preferencias.
      // Nunca guardamos la contraseña en localStorage.
      localStorage.setItem(
        "bamb-client-profile",
        JSON.stringify(clientProfile)
      );

      // Compatibilidad con el dashboard actual.
      localStorage.setItem("bamb-client-name", clientProfile.name);
      localStorage.setItem("bamb-client-email", clientProfile.email);
      localStorage.setItem(
        "bamb-client-whatsapp",
        clientProfile.whatsapp
      );
      localStorage.setItem(
        "bamb-client-whatsapp-consent",
        String(clientProfile.whatsappConsent)
      );

      // La tarjeta se generará en el dashboard con la lógica existente.
      navigate("/cliente/dashboard");
    } catch {
      setSubmitError(
        "No pudimos guardar tus datos en este navegador. Revisa el almacenamiento e inténtalo de nuevo."
      );
    }
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
            noValidate
          >
            <div className="register-client__field">
              <label htmlFor="clientName">Nombre completo</label>
              <input
                id="clientName"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                minLength={2}
                maxLength={80}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "clientNameError" : undefined}
              />
              {errors.name && (
                <small id="clientNameError" role="alert">
                  {errors.name}
                </small>
              )}
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
                inputMode="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "clientEmailError" : undefined}
              />
              {errors.email && (
                <small id="clientEmailError" role="alert">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="register-client__field">
              <label htmlFor="clientWhatsapp">Número de WhatsApp</label>
              <input
                id="clientWhatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+57 300 123 4567"
                value={formData.whatsapp}
                onChange={handleChange}
                maxLength={25}
                required
                aria-invalid={Boolean(errors.whatsapp)}
                aria-describedby={
                  errors.whatsapp ? "clientWhatsappError" : "clientWhatsappHelp"
                }
              />
              <small id="clientWhatsappHelp">
                Incluye el indicativo de tu país, por ejemplo +57 para Colombia.
              </small>
              {errors.whatsapp && (
                <small id="clientWhatsappError" role="alert">
                  {errors.whatsapp}
                </small>
              )}
            </div>

            <div className="register-client__field">
              <label htmlFor="clientPassword">Crea tu contraseña</label>
              <input
                id="clientPassword"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={128}
                value={formData.password}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "clientPasswordError" : "clientPasswordHelp"
                }
              />
              <small id="clientPasswordHelp">
                Usa al menos 8 caracteres. No reutilices una contraseña importante.
              </small>
              {errors.password && (
                <small id="clientPasswordError" role="alert">
                  {errors.password}
                </small>
              )}
            </div>

            <div className="register-client__consents">
              <label className="register-client__checkbox">
                <input
                  type="checkbox"
                  name="whatsappConsent"
                  checked={formData.whatsappConsent}
                  onChange={handleChange}
                />
                <span>
                  Acepto recibir notificaciones y novedades de Bamb por WhatsApp
                  (opcional).
                </span>
              </label>

              <label className="register-client__checkbox">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.acceptTerms)}
                />
                <span>Acepto los términos y condiciones.</span>
              </label>
              {errors.acceptTerms && (
                <small role="alert">{errors.acceptTerms}</small>
              )}

              <label className="register-client__checkbox">
                <input
                  type="checkbox"
                  name="acceptDataPolicy"
                  checked={formData.acceptDataPolicy}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.acceptDataPolicy)}
                />
                <span>
                  Acepto la política de tratamiento de datos personales.
                </span>
              </label>
              {errors.acceptDataPolicy && (
                <small role="alert">{errors.acceptDataPolicy}</small>
              )}
            </div>

            {submitError && (
              <p role="alert" aria-live="polite">
                {submitError}
              </p>
            )}

            <button
              type="submit"
             className="register-client__submit"
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
