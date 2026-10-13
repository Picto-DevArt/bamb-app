
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const LOGO_STORAGE_KEY = "bamb-company-logo";
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

function CompanyDashboardHeader() {
  const companyName = "Mi empresa"; // Dato provisional
  const fileInputRef = useRef(null);

  const [logo, setLogo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Recupera el logo guardado en este navegador.
  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
      if (savedLogo) setLogo(savedLogo);
    } catch {
      setError("No fue posible recuperar el logo guardado.");
    }
  }, []);

  function openLogoModal() {
    setPreview(logo);
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  }

  function closeLogoModal() {
    setIsModalOpen(false);
    setPreview("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleImageSelection(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("La imagen debe pesar máximo 1 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      } else {
        setError("No fue posible cargar la imagen.");
      }
    };

    reader.onerror = () => {
      setError("Ocurrió un error al leer la imagen.");
    };

    reader.readAsDataURL(file);
  }

  function saveLogo() {
    if (!preview) {
      setError("Selecciona una imagen antes de guardar.");
      return;
    }

    try {
      // Solo almacenamiento local provisional.
      localStorage.setItem(LOGO_STORAGE_KEY, preview);
      setLogo(preview);
      setSuccess("Logo guardado correctamente.");
      setIsModalOpen(false);
      setPreview("");
      setError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setError(
        "No se pudo guardar la imagen. Prueba con una imagen más pequeña."
      );
    }
  }

  function removeLogo() {
    setPreview("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <header className="company-topbar">
        <div className="company-identity">
          <button
            type="button"
            className="company-logo-button"
            onClick={openLogoModal}
            aria-label={logo ? "Cambiar logo de empresa" : "Subir logo de empresa"}
            title="Cambiar logo de empresa"
          >
            <span className="company-logo">
              {logo ? (
                <img src={logo} alt={`Logo de ${companyName}`} />
              ) : (
                <span>{companyName.charAt(0).toUpperCase()}</span>
              )}
            </span>

            <span className="company-logo-edit" aria-hidden="true">
              ✎
            </span>
          </button>

          <span className="company-name">{companyName}</span>
        </div>

        <Link to="/empresa/cuenta" className="company-edit-link">
          Mi empresa
        </Link>
      </header>

      {success && (
        <p className="company-logo-success" role="status">
          {success}
        </p>
      )}

      {isModalOpen && (
        <div
          className="company-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLogoModal();
            }
          }}
        >
          <section
            className="company-logo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="company-logo-modal-title"
          >
            <button
              type="button"
              className="company-modal-close"
              onClick={closeLogoModal}
              aria-label="Cerrar ventana"
            >
              ×
            </button>

            <h2 id="company-logo-modal-title">
              Logo de tu empresa
            </h2>

            <p>
              Sube una imagen para identificar tu empresa en Bamb.
            </p>

            <div className="company-logo-preview">
              {preview ? (
                <img src={preview} alt="Vista previa del logo" />
              ) : (
                <span>
                  {companyName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <label className="company-upload-button">
              {preview ? "Elegir otra imagen" : "Seleccionar imagen"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelection}
              />
            </label>

            <p className="company-upload-hint">
              Formatos de imagen compatibles. Tamaño máximo: 1 MB.
            </p>

            {error && (
              <p className="company-logo-error" role="alert">
                {error}
              </p>
            )}

            <div className="company-modal-actions">
              <button
                type="button"
                className="company-modal-cancel"
                onClick={closeLogoModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="company-modal-save"
                onClick={saveLogo}
                disabled={!preview}
              >
                Guardar logo
              </button>
            </div>

            {logo && (
              <button
                type="button"
                className="company-logo-remove"
                onClick={removeLogo}
              >
                Descartar selección
              </button>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default CompanyDashboardHeader;

