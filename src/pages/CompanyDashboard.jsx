
import { useState } from "react";
import "../styles/company-dashboard.css";
import CompanyDashboardHeader from "../components/CompanyDashboardHeader";
import CompanyDashboardNav from "../components/CompanyDashboardNav";
import { Link } from "react-router-dom";

// Datos de prueba mientras conectamos la base de datos.
const initialOffers = [
  {
    id: 1,
    name: "Descuento del 20% en productos",
    startDate: "2026-10-01",
    endDate: "2026-11-30",
    totalQuantity: 100,
    remainingQuantity: 72,
    status: "active",
  },
  {
    id: 2,
    name: "Combo especial Bamb",
    startDate: "2026-10-05",
    endDate: "2026-12-15",
    totalQuantity: 50,
    remainingQuantity: 50,
    status: "paused",
  },
  {
    id: 3,
    name: "Promoción de lanzamiento",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    totalQuantity: 30,
    remainingQuantity: 0,
    status: "expired",
  },
];

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CompanyDashboard() {
  const [offers, setOffers] = useState(initialOffers);

  function toggleOffer(id) {
    setOffers((currentOffers) =>
      currentOffers.map((offer) => {
        if (offer.id !== id) return offer;

        return {
          ...offer,
          status: offer.status === "paused" ? "active" : "paused",
        };
      })
    );
  }

  function deleteOffer(id) {
    const confirmed = window.confirm(
      "¿Seguro que deseas eliminar esta oferta?"
    );

    if (!confirmed) return;

    setOffers((currentOffers) =>
      currentOffers.filter((offer) => offer.id !== id)
    );
  }

  function getStatus(offer) {
    if (offer.status === "paused") return "Pausada";
    if (offer.status === "expired") return "Vencida";
    if (offer.remainingQuantity === 0) return "Agotada";

    return "Activa";
  }

  const activeCount = offers.filter(
    (offer) =>
      offer.status === "active" &&
      offer.remainingQuantity > 0 &&
      offer.endDate >= new Date().toLocaleDateString("en-CA")
  ).length;

  return (
    <>
      <CompanyDashboardHeader />

      <main className="company-dashboard">
        <section className="dashboard-heading">
          <p className="dashboard-eyebrow">PANEL DE EMPRESA</p>
          <h1>Gestiona tus ofertas</h1>
          <p>
            Consulta la vigencia, las cantidades disponibles y el estado
            de las ofertas de tu empresa.
          </p>
        </section>

        <section className="dashboard-summary" aria-label="Resumen de ofertas">
          <div className="summary-card">
            <span>Total de ofertas</span>
            <strong>{offers.length}</strong>
          </div>

          <div className="summary-card">
            <span>Ofertas activas</span>
            <strong>{activeCount}</strong>
          </div>
        </section>

        <section className="offers-management">
          
<div className="offers-section-heading">
  <div>
    <h2>Tus ofertas</h2>
    <span>{offers.length} en total</span>
  </div>

  <Link
    to="/empresa/ofertas/nueva"
    className="create-offer-button"
  >
    + Crear nueva oferta
  </Link>
</div>
          {offers.length === 0 ? (
            <div className="empty-offers">
              <h3>Aún no tienes ofertas</h3>
              <p>Cuando publiques una oferta, aparecerá aquí.</p>
            </div>
          ) : (
            <div className="company-offers-list">
              {offers.map((offer) => {
                const isExpired =
                  offer.endDate <
                  new Date().toLocaleDateString("en-CA");

                const isUnavailable =
                  offer.status === "expired" ||
                  isExpired ||
                  offer.remainingQuantity === 0;

                return (
                  <article className="company-offer-card" key={offer.id}>
                    <div className="offer-card-top">
                      <div>
                        <span
                          className={`offer-status ${
                            isUnavailable
                              ? "status-unavailable"
                              : offer.status === "paused"
                                ? "status-paused"
                                : "status-active"
                          }`}
                        >
                          {isExpired ? "Vencida" : getStatus(offer)}
                        </span>

                        <h3>{offer.name}</h3>
                      </div>
                    </div>

                    <div className="offer-details">
                      <div className="offer-detail">
                        <span>Inicio de vigencia</span>
                        <strong>{formatDate(offer.startDate)}</strong>
                      </div>

                      <div className="offer-detail">
                        <span>Fin de vigencia</span>
                        <strong>{formatDate(offer.endDate)}</strong>
                      </div>

                      <div className="offer-detail">
                        <span>Cantidad inicial</span>
                        <strong>{offer.totalQuantity}</strong>
                      </div>

                      <div className="offer-detail">
                        <span>Disponibles</span>
                        <strong>{offer.remainingQuantity}</strong>
                      </div>
                    </div>

                    <div className="offer-actions">
                      <button
                        type="button"
                        className="offer-action-button"
                        disabled={isUnavailable}
                        onClick={() => toggleOffer(offer.id)}
                      >
                        {offer.status === "paused"
                          ? "Reactivar oferta"
                          : "Pausar oferta"}
                      </button>

                      <button
                        type="button"
                        className="offer-delete-button"
                        onClick={() => deleteOffer(offer.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        <CompanyDashboardNav />
      </main>
    </>
  );
}

export default CompanyDashboard;
