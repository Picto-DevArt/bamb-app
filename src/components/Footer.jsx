import "../styles/footer.css";

const footerGroups = [
  {
    id: "contacto",
    title: "Contacto",
    links: [
      { label: "Información", href: "#informacion" },
      { label: "Aliados", href: "#aliados" },
      { label: "Clientes", href: "#clientes" },
    ],
  },
  {
    id: "afiliados",
    title: "Afiliados",
    links: [
      { label: "Marcas", href: "#marcas" },
      { label: "Términos y condiciones", href: "#terminos" },
      { label: "Política de datos", href: "#politica-datos" },
    ],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {footerGroups.map((group) => (
          <nav
            className="footer__group"
            key={group.id}
            aria-label={group.title}
          >
            <h2 className="footer__heading">{group.title}</h2>

            <ul className="footer__links">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer__brand">
          <div className="footer__brand-name">
            <span className="footer__brand-title">TARJETA</span>
            <span className="footer__brand-slogan">
              SIGUE DISFRUTANDO!
            </span>
          </div>

          <div className="footer__social">
            <h2 className="footer__heading">Síguenos en:</h2>

            <div className="footer__social-links">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="footer__social-link"
              >
                IG
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="footer__social-link"
              >
                FB
              </a>
              <a
                href="#tiktok"
                aria-label="TikTok"
                className="footer__social-link"
              >
                TK
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;