
import { useState } from "react";
import "../styles/categories-accordion.css";

const categories = [
  {
    id: "tecnologia",
    name: "Tecnología",
    companies: [
      { id: 1, name: "Tecno Store", initials: "TS", style: "purple" },
      { id: 2, name: "Digital Lab", initials: "DL", style: "blue" },
      { id: 3, name: "Smart Zone", initials: "SZ", style: "orange" },
      { id: 4, name: "Pixel Shop", initials: "PS", style: "lime" },
      { id: 5, name: "Nova Tech", initials: "NT", style: "blue" },
    ],
  },
  {
    id: "comida",
    name: "Comida",
    companies: [
      { id: 6, name: "Casa Pasta", initials: "CP", style: "orange" },
      { id: 7, name: "Café Central", initials: "CC", style: "purple" },
      { id: 8, name: "Dulce Aroma", initials: "DA", style: "lime" },
      { id: 9, name: "Sabor Local", initials: "SL", style: "blue" },
    ],
  },
  {
    id: "regalos",
    name: "Regalos",
    companies: [
      { id: 10, name: "Detalles", initials: "DT", style: "purple" },
      { id: 11, name: "Flor de Luna", initials: "FL", style: "lime" },
      { id: 12, name: "Regala Más", initials: "RM", style: "orange" },
    ],
  },
  {
    id: "salud",
    name: "Salud y cuidado",
    companies: [
      { id: 13, name: "Vital Spa", initials: "VS", style: "blue" },
      { id: 14, name: "Piel Sana", initials: "PS", style: "purple" },
      { id: 15, name: "Bienestar", initials: "BN", style: "lime" },
    ],
  },
  {
    id: "entretenimiento",
    name: "Entretenimiento y diversión",
    companies: [
      { id: 16, name: "Play House", initials: "PH", style: "orange" },
      { id: 17, name: "Cine Club", initials: "CC", style: "purple" },
      { id: 18, name: "Aventura", initials: "AV", style: "blue" },
    ],
  },
  {
    id: "mascotas",
    name: "Mascotas",
    companies: [
      { id: 19, name: "Pet House", initials: "PT", style: "lime" },
      { id: 20, name: "Mundo Animal", initials: "MA", style: "orange" },
      { id: 21, name: "Huella Feliz", initials: "HF", style: "blue" },
    ],
  },
];

function CategoriesAccordion() {
  const [openCategory, setOpenCategory] = useState(null);

  function toggleCategory(categoryId) {
    setOpenCategory((current) =>
      current === categoryId ? null : categoryId
    );
  }

  return (
    <section className="categories" id="categorias">
      <div className="categories__header">
        <h2>Explora por categorías</h2>
        <p>Encuentra empresas y experiencias para disfrutar.</p>
      </div>

      <div className="categories__list">
        {categories.map((category) => {
          const isOpen = openCategory === category.id;
          const panelId = `category-panel-${category.id}`;

          return (
            <article
              className={`category ${
                isOpen ? "category--open" : ""
              }`}
              key={category.id}
            >
              <button
                className="category__trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleCategory(category.id)}
              >
                <span>{category.name}</span>

                <span
                  className="category__arrow"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {isOpen && (
                <div className="category__panel" id={panelId}>
                  <div className="company-grid">
                    {category.companies.map((company) => (
                      <article
                        className="company-card"
                        key={company.id}
                      >
                        <div
                          className={`company-card__image company-card__image--${company.style}`}
                          role="img"
                          aria-label={`Imagen de ${company.name}`}
                        >
                          <span>{company.initials}</span>
                        </div>

                        <h3 className="company-card__name">
                          {company.name}
                        </h3>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CategoriesAccordion;