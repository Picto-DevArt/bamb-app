
import { useState } from "react";
import "../styles/hero.css";

const slides = [
  {
    id: 1,
    title: "Sigue disfrutando",
    description: "Descubre experiencias que te encantan.",
    className: "hero__slide--one",
  },
  {
    id: 2,
    title: "Algo bueno te espera",
    description: "Encuentra nuevas formas de disfrutar.",
    className: "hero__slide--two",
  },
  {
    id: 3,
    title: "Tu próxima experiencia",
    description: "Explora las ofertas de Bamb.",
    className: "hero__slide--three",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  function showPrevious() {
    setActiveSlide((current) =>
      (current - 1 + slides.length) % slides.length
    );
  }

  function showNext() {
    setActiveSlide((current) =>
      (current + 1) % slides.length
    );
  }

  return (
    <section className="hero" aria-label="Descubre Bamb">
      <div className="hero__viewport">
        <div
          className="hero__track"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <article
              key={slide.id}
              className={`hero__slide ${slide.className}`}
              aria-label={slide.title}
            >
              <div className="hero__overlay">
                <div className="hero__copy">
                  <p className="hero__eyebrow">BAMB</p>
                  <h1>{slide.title}</h1>
                  <p className="hero__description">
                    {slide.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="hero__control hero__control--previous"
          onClick={showPrevious}
          aria-label="Ver oferta anterior"
        >
          ‹
        </button>

        <button
          type="button"
          className="hero__control hero__control--next"
          onClick={showNext}
          aria-label="Ver oferta siguiente"
        >
          ›
        </button>
      </div>

      <div className="hero__indicators" aria-label="Seleccionar tarjeta">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero__indicator ${
              index === activeSlide ? "hero__indicator--active" : ""
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Mostrar tarjeta ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;