import Header from "../components/Header";
import Hero from "../components/Hero";
import OffersCarousel from "../components/OffersCarousel";
import CategoriesAccordion from "../components/CategoriesAccordion";
import AlliedBrands from "../components/AlliedBrands";
import Footer from "../components/Footer";
import StickyBottomCTA from "../components/StickyBottomCTA";

function Home() {
  const categories = [
    "Tecnología",
    "Comida",
    "Regalos",
    "Salud y cuidado",
    "Entretenimiento y diversión",
    "Mascotas",
  ];

  return (
    <>
    <Header />

    <main>
      <header>
        <h1>Bamb</h1>
        <p>Ofertas que te interesan.</p>
      </header>
      <Hero/>
      <OffersCarousel />
      <CategoriesAccordion />
      <AlliedBrands />
    

     
       
    </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}

export default Home;