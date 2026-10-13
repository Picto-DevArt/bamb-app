
import { useState } from "react";
import "../styles/offers-carousel.css";

const offers = [
  { id: 1, image: "/images/offer-1.png", alt: "Oferta destacada 1" },
  { id: 2, image: "/images/offer-2.png", alt: "Oferta destacada 2" },
  { id: 3, image: "/images/offer-3.png", alt: "Oferta destacada 3" },
  { id: 4, image: "/images/offer-4.png", alt: "Oferta destacada 4" },
];

function OffersCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function showPrevious() {
    setActiveIndex((current) =>
      (current - 1 + offers.length) % offers.length
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      (current + 1) % offers.length
    );
  }

  return (
    <section className="offers" aria-label="Ofertas destacadas">
      <div className="offers__header">
        <h2>Ofertas para disfrutar</h2>
        <p>Descubre lo que Bamb tiene para ti.</p>
      </div>

      <div className="offers__viewport">
        <div
          className="offers__track"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {offers.map((offer) => (
            <article className="offers__slide" key={offer.id}>
              <img
                src={offer.image}
                alt={offer.alt}
                loading="lazy"
              />
            </article>
          ))}
        </div>

        <button
          className="offers__control offers__control--previous"
          type="button"
          onClick={showPrevious}
          aria-label="Oferta anterior"
        >
          ‹
        </button>

        <button
          className="offers__control offers__control--next"
          type="button"
          onClick={showNext}
          aria-label="Oferta siguiente"
        >
          ›
        </button>
      </div>

      <div className="offers__indicators">
        {offers.map((offer, index) => (
          <button
            key={offer.id}
            type="button"
            className={`offers__indicator ${
              index === activeIndex ? "offers__indicator--active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Mostrar oferta ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default OffersCarousel;