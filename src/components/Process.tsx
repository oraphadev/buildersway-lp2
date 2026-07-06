import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";
import processFlow from "../assets/process-flow.webp";

const STEPS = [
  {
    title: "Compreender",
    description:
      "Entendemos profundamente o seu negócio: processos, pessoas, objetivos e restrições. Sem entendimento profundo, não existe recomendação técnica.",
  },
  {
    title: "Diagnosticar",
    description:
      "Transformamos conhecimento em clareza: identificamos gargalos, priorizamos oportunidades, avaliamos riscos e estimamos impacto.",
  },
  {
    title: "Construir",
    description:
      "Projetamos e implementamos soluções personalizadas. Toda tecnologia utilizada possui justificativa explícita, nunca tendências.",
  },
  {
    title: "Evoluir",
    description:
      "Acompanhamos a evolução do seu negócio após a implementação. O objetivo não é concluir um projeto; é construir parceria de longo prazo.",
  },
];

type ProcessCardProps = {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
};

function ProcessCard({ step, index, progress }: ProcessCardProps) {
  const reduceMotion = useReducedMotion();
  const offset = 16 + index * 18;
  const parallaxY = useTransform(progress, [0, 1], [offset, -offset]);

  return (
    <motion.li
      className="process__card-wrap"
      style={reduceMotion ? undefined : { y: parallaxY }}
    >
      <motion.div
        className="process__card"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-64px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        <span className="process__number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </motion.div>
    </motion.li>
  );
}

export function Process() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: bgProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(bgProgress, [0, 1], [-64, 64]);
  const bgOpacity = useTransform(
    bgProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.38, 0.38, 0.1],
  );

  return (
    <section ref={sectionRef} id="como-atuamos" className="process section-large">
      <motion.img
        src={processFlow}
        alt=""
        aria-hidden="true"
        className="section-art section-art--bleed process__bg"
        loading="lazy"
        decoding="async"
        style={
          reduceMotion ? { opacity: 0.3 } : { y: bgY, opacity: bgOpacity }
        }
      />
      <div className="padding-global">
        <div className="container-large">
          <header className="process__header">
            <Reveal>
              <p className="eyebrow">Como atuamos</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-h2">
                Estratégia antes de{" "}
                <span className="text-gradient-ivory">tecnologia</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-medium text-muted">
                Todo relacionamento começa pela compreensão do problema. A
                implementação é consequência, nunca o ponto de partida.
              </p>
            </Reveal>
          </header>
          <ul ref={listRef} className="process__list">
            {STEPS.map((step, index) => (
              <ProcessCard
                key={step.title}
                step={step}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
