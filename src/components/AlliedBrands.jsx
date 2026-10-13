
import "../styles/allied-brands.css";

const brands = [
  { id: 1, name: "Marca aliada 1", className: "allied-brands__logo--one" },
  { id: 2, name: "Marca aliada 2", className: "allied-brands__logo--two" },
  { id: 3, name: "Marca aliada 3", className: "allied-brands__logo--three" },
  { id: 4, name: "Marca aliada 4", className: "allied-brands__logo--four" },
];

function AlliedBrands() {
  return (
    <section className="allied-brands" aria-label="Marcas aliadas">
      <div className="allied-brands__grid">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`allied-brands__logo ${brand.className}`}
            role="img"
            aria-label={brand.name}
          />
        ))}
      </div>
    </section>
  );
}

export default AlliedBrands;
