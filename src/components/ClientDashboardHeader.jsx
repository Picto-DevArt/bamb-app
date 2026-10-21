
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PHOTO_STORAGE_KEY = "bamb-client-profile-photo";
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // Máximo 1 MB

function ClientDashboardHeader() {
  const fileInputRef = useRef(null);

  const [clientName, setClientName] = useState(
    () => localStorage.getItem("bamb-client-name") || "Mi perfil"
  );
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    function loadClientProfile() {
      try {
        setPhoto(localStorage.getItem(PHOTO_STORAGE_KEY) || "");
        setClientName(localStorage.getItem("bamb-client-name") || "Mi perfil");
      } catch {
        setError("No fue posible recuperar los datos del perfil.");
      }
    }

    loadClientProfile();
    window.addEventListener("bamb-client-profile-updated", loadClientProfile);
    return () => window.removeEventListener("bamb-client-profile-updated", loadClientProfile);
  }, []);

  function openModal() {
    setPreview(photo);
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setPreview("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handlePhotoSelection(event) {
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

  function savePhoto() {
    if (!preview) {
      setError("Selecciona una imagen antes de guardar.");
      return;
    }

    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, preview);
      setPhoto(preview);
      setSuccess("Foto de perfil actualizada.");
      setIsModalOpen(false);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setError(
        "No se pudo guardar la imagen. Prueba con una imagen más pequeña."
      );
    }
  }

  function removePhoto() {
    setPreview("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <header className="client-topbar">
        <div className="client-identity">
          <button
            type="button"
            className="client-photo-button"
            onClick={openModal}
            aria-label="Cambiar foto de perfil"
            title="Cambiar foto de perfil"
          >
            <span className="client-profile-photo">
              {photo ? (
                <img src={photo} alt={`Foto de ${clientName}`} />
              ) : (
                <span>
                  {clientName.charAt(0).toUpperCase()}
                </span>
              )}
            </span>

            <span className="client-photo-edit" aria-hidden="true">
              ✎
            </span>
          </button>

          <div className="client-identity-text">
            <span className="client-welcome-label">Bienvenido/a</span>
            <strong>{clientName}</strong>
          </div>
        </div>

        <Link to="/cliente/cuenta" className="client-edit-link">
          Mi cuenta
        </Link>
      </header>

      {success && (
        <p className="client-photo-success" role="status">
          {success}
        </p>
      )}

      {isModalOpen && (
        <div
          className="client-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            className="client-photo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-photo-modal-title"
          >
            <button
              type="button"
              className="client-modal-close"
              onClick={closeModal}
              aria-label="Cerrar ventana"
            >
              ×
            </button>

            <h2 id="client-photo-modal-title">
              Tu foto de perfil
            </h2>

            <p>
              Elige una imagen para personalizar tu cuenta Bamb.
            </p>

            <div className="client-photo-preview">
              {preview ? (
                <img src={preview} alt="Vista previa de tu foto" />
              ) : (
                <span>
                  {clientName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <label className="client-upload-button">
              {preview ? "Elegir otra imagen" : "Seleccionar imagen"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelection}
              />
            </label>

            <p className="client-upload-hint">
              Formatos de imagen compatibles. Tamaño máximo: 1 MB.
            </p>

            {error && (
              <p className="client-photo-error" role="alert">
                {error}
              </p>
            )}

            <div className="client-modal-actions">
              <button
                type="button"
                className="client-modal-cancel"
                onClick={closeModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="client-modal-save"
                onClick={savePhoto}
                disabled={!preview}
              >
                Guardar foto
              </button>
            </div>

            {photo && (
              <button
                type="button"
                className="client-photo-remove"
                onClick={removePhoto}
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

export default ClientDashboardHeader;
