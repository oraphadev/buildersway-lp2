import { motion } from "motion/react";
import { Button } from "./ui/Button";
import { Logomark } from "./Logomark";

export function Nav() {
  return (
    <motion.header
      className="nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="padding-global">
        <nav className="nav__inner container-large" aria-label="Navegação principal">
          <a href="#" className="nav__logo">
            <Logomark size={22} />
            BuildersWay
          </a>
          <ul className="nav__links">
            <li>
              <a href="#como-atuamos">Como atuamos</a>
            </li>
            <li>
              <a href="#principios">Princípios</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
          <Button href="#contato" small withArrow>
            <span className="nav__cta-label nav__cta-label--full">
              Fale conosco
            </span>
            <span className="nav__cta-label nav__cta-label--short">Contato</span>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
