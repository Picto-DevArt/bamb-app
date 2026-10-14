
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import ClientDashboardHeader from "../components/ClientDashboardHeader";
import "../styles/client-dashboard.css";

// Datos provisionales para diseñar la interfaz.
const featuredOffers = [
  {
    id: 1,
    title: "Descubre nuevas experiencias",
    description: "Encuentra beneficios pensados para ti.",
    category: "Experiencias",
    image: "/images/client-featured-1.jpg",
  },
  {
    id: 2,
    title: "Ofertas para disfrutar",
    description: "Explora los comercios aliados de Bamb.",
    category: "Comercio",
    image: "/images/client-featured-2.jpg",
  },
  {
    id: 3,
    title: "Siempre hay algo nuevo",
    description: "Conoce las oportunidades disponibles.",
    category: "Bienestar",
    image: "/images/client-featured-3.jpg",
  },
];

const availableOffers = [
  {
    id: 1,
    company: "Comercio aliado",
    title: "Una experiencia para ti",
    category: "Experiencias",
    image: "/images/client-offer-1.jpg",
    validity: "Consulta la vigencia",
  },
  {
    id: 2,
    company: "Comercio aliado",
    title: "Descubre este beneficio",
    category: "Gastronomía",
    image: "/images/client-offer-2.jpg",
    validity: "Consulta la vigencia",
  },
  {
    id: 3,
    company: "Comercio aliado",
    title: "Algo especial te espera",
    category: "Bienestar",
    image: "/images/client-offer-3.jpg",
    validity: "Consulta la vigencia",
  },
  {
    id: 4,
    company: "Comercio aliado",
    title: "Una nueva oportunidad",
    category: "Entretenimiento",
    image: "/images/client-offer-4.jpg",
    validity: "Consulta la vigencia",
  },
];

const categories = [
  "Todas",
  "Experiencias",
  "Gastronomía",
  "Bienestar",
  "Entretenimiento",
];

// Recupera el código de la tarjeta o genera uno para este navegador.
function getOrCreateCardCode() {
  const storageKey = "bamb-client-card-code";
  const savedCode = localStorage.getItem(storageKey);

  if (savedCode) {
    return savedCode;
  }

  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function generateSegment(length) {
    return Array.from({ length }, () => {
      const index = Math.floor(Math.random() * characters.length);
      return characters[index];
    }).join("");
  }

  const newCode = `BAMB-${generateSegment(4)}-${generateSegment(4)}`;

  localStorage.setItem(storageKey, newCode);

  return newCode;
}

// Genera la tarjeta Bamb como archivo PDF.
function downloadBambCard(clientName, cardCode) {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [85.6, 54],
  });

  // Fondo morado de la marca.
  pdf.setFillColor(134, 36, 221);
  pdf.rect(0, 0, 85.6, 54, "F");

  // Identidad de la tarjeta.
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(19);
  pdf.text("BAMB", 7, 12);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("TU TARJETA DE BENEFICIOS", 7, 18);

  // Nombre del cliente.
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);

  const safeName = clientName || "Cliente Bamb";
  const nameLines = pdf.splitTextToSize(safeName, 70);

  pdf.text(nameLines.slice(0, 2), 7, 29);

  // Código de la tarjeta.
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text("CODIGO DE CLIENTE", 7, 40);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(cardCode, 7, 47);

  // Acento gráfico en color lima.
  pdf.setFillColor(215, 223, 35);
  pdf.circle(76, 9, 4, "F");

  pdf.save(`tarjeta-bamb-${cardCode}.pdf`);
}
function ClientDashboard() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [cardCode] = useState(getOrCreateCardCode);

  const currentSlide = featuredOffers[activeSlide];

  const filteredOffers =
    activeCategory === "Todas"
      ? availableOffers
      : availableOffers.filter(
          (offer) => offer.category === activeCategory
        );

  function changeSlide(direction) {
    setActiveSlide((current) => {
      return (
        (current + direction + featuredOffers.length) %
        featuredOffers.length
      );
    });
  }

  return (
    <>
      <ClientDashboardHeader />

      <main className="client-dashboard">
        <section className="client-welcome">
          <p className="client-section-eyebrow">TU ESPACIO BAMB</p>
          <h1>¡Descubre algo bueno hoy!</h1>
          <p>
            Explora ofertas, conoce comercios y encuentra nuevas
            experiencias.
          </p>
        </section>
          
        <section className="client-bamb-card-section">
          <div className="client-section-heading">
            <div>
              <h2>Mi tarjeta Bamb</h2>
              <p>Tu tarjeta digital para disfrutar de los beneficios.</p>
            </div>
          </div>

          <div className="client-bamb-card">
            <div className="client-bamb-card-decoration" aria-hidden="true" />

            <div className="client-bamb-card-header">
              <div className="client-bamb-logo">BAMB</div>
              <span className="client-bamb-card-label">
                TARJETA DE BENEFICIOS
              </span>
            </div>

            <div className="client-bamb-card-details">
              <p className="client-bamb-card-caption">TITULAR</p>
              <h3>
                {localStorage.getItem("bamb-client-name") || "Cliente Bamb"}
              </h3>
            </div>

            <div className="client-bamb-card-footer">
              <div>
                <p className="client-bamb-card-caption">CÓDIGO DE CLIENTE</p>
                <strong>{cardCode}</strong>
              </div>
              <span className="client-bamb-card-symbol" aria-hidden="true">
                B
              </span>
            </div>
          </div>

          <button
            type="button"
            className="client-bamb-download-button"
            onClick={() =>
              downloadBambCard(
                localStorage.getItem("bamb-client-name") || "Cliente Bamb",
                cardCode
              )
            }
          >
            Descargar mi tarjeta en PDF
          </button>

          <p className="client-bamb-card-note">
            Guarda tu tarjeta para tener a mano tu código de cliente.
          </p>
        </section>

        <section className="client-featured-section">
          <div className="client-section-heading">
            <div>
              <h2>Destacados para ti</h2>
              <p>Inspírate con lo que Bamb tiene para ofrecerte.</p>
            </div>
          </div>

          <article
            className="client-featured-card"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(28, 15, 40, 0.82), rgba(28, 15, 40, 0.08)), url("${currentSlide.image}")`,
            }}
          >
            <div className="client-featured-content">
              <span>{currentSlide.category}</span>
              <h2>{currentSlide.title}</h2>
              <p>{currentSlide.description}</p>
            </div>

            <div className="client-featured-controls">
              <button
                type="button"
                onClick={() => changeSlide(-1)}
                aria-label="Oferta destacada anterior"
              >
                ‹
              </button>

              <span>
                {activeSlide + 1} / {featuredOffers.length}
              </span>

              <button
                type="button"
                onClick={() => changeSlide(1)}
                aria-label="Siguiente oferta destacada"
              >
                ›
              </button>
            </div>
          </article>

          <div className="client-slide-indicators">
            {featuredOffers.map((offer, index) => (
              <button
                key={offer.id}
                type="button"
                className={
                  index === activeSlide
                    ? "client-slide-dot active"
                    : "client-slide-dot"
                }
                onClick={() => setActiveSlide(index)}
                aria-label={`Ver destacado ${index + 1}`}
                aria-current={index === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
        </section>

        <section className="client-offers-section">
          <div className="client-section-heading">
            <div>
              <h2>Ofertas disponibles</h2>
              <p>Explora los beneficios de nuestros comercios aliados.</p>
            </div>
          </div>

          <div
            className="client-category-filters"
            aria-label="Filtrar ofertas por categoría"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "client-category-chip active"
                    : "client-category-chip"
                }
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredOffers.length > 0 ? (
            <div className="client-offers-grid">
              {filteredOffers.map((offer) => (
                <article className="client-offer-card" key={offer.id}>
                  <div className="client-offer-image">
                    <img
                      src={offer.image}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{offer.category}</span>
                  </div>

                  <div className="client-offer-info">
                    <p className="client-offer-company">
                      {offer.company}
                    </p>
                    <h3>{offer.title}</h3>
                    <p className="client-offer-validity">
                      {offer.validity}
                    </p>
                    <button
                      type="button"
                      className="client-offer-detail-button"
                      onClick={() =>
                        window.alert(
                          "Más adelante conectaremos esta tarjeta con el detalle real de la oferta."
                        )
                      }
                    >
                      Ver oferta
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="client-empty-state">
              Aún no hay ofertas en esta categoría.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default ClientDashboard;
