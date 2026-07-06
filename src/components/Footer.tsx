import { Logomark } from "./Logomark";

export function Footer() {
  return (
    <footer className="footer padding-global">
      <div className="container-large">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#" className="nav__logo">
              <Logomark size={22} />
              BuildersWay
            </a>
            <p className="footer__tagline">
              Consultoria especializada em Inteligência Artificial aplicada.
              Impulsionamos negócios através da inteligência artificial.
            </p>
          </div>
          <nav className="footer__nav" aria-label="Explorar">
            <h2>Explorar</h2>
            <ul>
              <li>
                <a href="#como-atuamos">Como atuamos</a>
              </li>
              <li>
                <a href="#principios">Princípios</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© 2026 BuildersWay. Todos os direitos reservados.</span>
          <span className="footer__motto">Nós pensamos. A IA torna real.</span>
        </div>
      </div>
    </footer>
  );
}
