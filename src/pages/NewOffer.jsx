
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyDashboardHeader from "../components/CompanyDashboardHeader";
import CompanyDashboardNav from "../components/CompanyDashboardNav";
import "../styles/new-offer.css";
import { loadOffers, saveOffers } from "../data/offersStorage";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function NewOffer() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    quantity: "",
  });

  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("La imagen debe pesar máximo 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      } else {
        setError("No fue posible cargar la imagen.");
      }
    };

    reader.onerror = () => {
      setError("Ocurrió un error al leer la imagen.");
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!image) {
      setError("Debes seleccionar una imagen para la oferta.");
      return;
    }

    if (form.endDate < form.startDate) {
      setError("La fecha de vencimiento no puede ser anterior al inicio.");
      return;
    }

    const quantity = Number(form.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("La cantidad debe ser un número entero mayor que cero.");
      return;
    }

    const newOffer = {
      id: crypto.randomUUID(),
      ...form,
      quantity,
      remaining: quantity,
      image,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      const offers = loadOffers([]);
      saveOffers([
        ...offers,
        {
          ...newOffer,
          name: newOffer.name.trim(),
          title: newOffer.title.trim(),
          description: newOffer.description.trim(),
          totalQuantity: quantity,
          remainingQuantity: quantity,
        },
      ]);

      navigate("/empresa/dashboard");
    } catch {
      setError(
        "No fue posible guardar la oferta. Prueba con una imagen más pequeña."
      );
    }
  }

  return (
    <>
      <CompanyDashboardHeader />

      <main className="new-offer-page">
        <div className="new-offer-heading">
          <div>
            <p className="new-offer-eyebrow">PANEL DE EMPRESA</p>
            <h1>Crear nueva oferta</h1>
            <p>
              Completa la información para preparar tu oferta en Bamb.
            </p>
          </div>

          <Link
            to="/empresa/dashboard"
            className="new-offer-back-link"
          >
            ← Volver al panel
          </Link>
        </div>

        <form className="new-offer-form" onSubmit={handleSubmit}>
          <section className="new-offer-section">
            <h2>Información de la oferta</h2>
            <p className="new-offer-section-description">
              Estos datos ayudarán a los clientes a entender tu oferta.
            </p>

            <div className="new-offer-field">
              <label htmlFor="offer-name">Nombre de la oferta *</label>
              <input
                id="offer-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej. Descuento de bienvenida"
                maxLength={80}
                required
              />
            </div>

            <div className="new-offer-field">
              <label htmlFor="offer-title">Título de la oferta *</label>
              <input
                id="offer-title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Un título atractivo para tus clientes"
                maxLength={100}
                required
              />
            </div>

            <div className="new-offer-field">
              <label htmlFor="offer-description">Descripción *</label>
              <textarea
                id="offer-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Explica qué incluye y cuáles son las condiciones."
                rows={5}
                maxLength={1000}
                required
              />
              <small>{form.description.length}/1000 caracteres</small>
            </div>
          </section>

          <section className="new-offer-section">
            <h2>Imagen de la oferta</h2>
            <p className="new-offer-section-description">
              Selecciona una imagen que represente tu beneficio.
            </p>

            <button
              type="button"
              className="new-offer-image-picker"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Vista previa de la oferta" />
              ) : (
                <span className="new-offer-image-placeholder">
                  <span className="new-offer-image-icon">＋</span>
                  <strong>Seleccionar imagen</strong>
                  <small>Formatos de imagen · Máximo 2 MB</small>
                </span>
              )}
            </button>

            <input
              ref={fileInputRef}
              className="new-offer-file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {image && (
              <button
                type="button"
                className="new-offer-remove-image"
                onClick={() => {
                  setImage("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                Quitar imagen
              </button>
            )}
          </section>

          <section className="new-offer-section">
            <h2>Vigencia y disponibilidad</h2>
            <p className="new-offer-section-description">
              Define cuándo estará disponible y cuántas veces se podrá
              entregar.
            </p>

            <div className="new-offer-date-grid">
              <div className="new-offer-field">
                <label htmlFor="offer-start">Fecha de inicio *</label>
                <input
                  id="offer-start"
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="new-offer-field">
                <label htmlFor="offer-end">Fecha de vencimiento *</label>
                <input
                  id="offer-end"
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  min={form.startDate || undefined}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="new-offer-field">
              <label htmlFor="offer-quantity">
                Cantidad total de entregas *
              </label>
              <input
                id="offer-quantity"
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Ej. 100"
                min="1"
                step="1"
                required
              />
              <small>
                Podrás consultar las unidades restantes desde tu panel.
              </small>
            </div>
          </section>

          {error && (
            <p className="new-offer-error" role="alert">
              {error}
            </p>
          )}

          <div className="new-offer-actions">
            <Link
              to="/empresa/dashboard"
              className="new-offer-cancel-button"
            >
              Cancelar
            </Link>

            <button type="submit" className="new-offer-publish-button">
              Publicar oferta
            </button>
          </div>
        </form>
      </main>

      <CompanyDashboardNav />
    </>
  );
}

export default NewOffer;
