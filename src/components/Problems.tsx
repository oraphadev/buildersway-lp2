import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";
import problemsDrift from "../assets/problems-drift.webp";

const PROBLEMS = [
  "Processos excessivamente manuais e baixa produtividade",
  "Equipes sobrecarregadas com atividades repetitivas",
  "Custos operacionais elevados",
  "Ausência de estratégia para adoção de IA",
  "Dificuldade para priorizar iniciativas tecnológicas",
  "Dificuldade em escalar operações",
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4 9.5 7.5 13 14 5.5"
        stroke="#0BD972"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Problems() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <section
      ref={sectionRef}
      className="problems-section section-large padding-global"
    >
      {/* Cauda do rio de partículas da seção "Como atuamos" acima: as
          partículas continuam caindo aqui e se dissipam, conectando os
          dois planos de fundo. */}
      <motion.img
        src={problemsDrift}
        alt=""
        aria-hidden="true"
        className="section-art section-art--bleed problems__bg"
        loading="lazy"
        decoding="async"
        style={reduceMotion ? undefined : { y: bgY }}
      />
      <div className="container-large">
        <header className="problems__header">
          <Reveal>
            <p className="eyebrow">O que resolvemos</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-h2">
              Resolvemos problemas de negócio.{" "}
              <span className="text-gradient-ivory">Não problemas tecnológicos.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-medium text-muted">
              Estes são sintomas frequentes. Nosso trabalho é compreender as
              causas. Só então definimos a solução.
            </p>
          </Reveal>
        </header>
        <ul className="problems__grid">
          {PROBLEMS.map((problem, index) => (
            <motion.li
              key={problem}
              className="problems__item"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <CheckIcon />
              <p>{problem}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
