import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Fragment, useRef } from "react";

const CONCEPTS = [
  "Estratégia",
  "Diagnóstico",
  "Impacto",
  "Resultado",
  "Evolução",
  "Eficiência",
  "Parceria",
  "Execução",
];

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function Sequence() {
  return (
    <>
      {CONCEPTS.map((concept) => (
        <Fragment key={concept}>
          <span>{concept}</span>
          <span className="marquee__dot" aria-hidden="true">
            •
          </span>
        </Fragment>
      ))}
    </>
  );
}

/**
 * Marquee com velocidade reativa ao scroll: acelera conforme a velocidade
 * do scroll do usuário e inverte a direção quando o scroll sobe.
 */
export function ConceptMarquee() {
  const reduceMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const directionFactor = useRef(1);
  const baseVelocity = -1.5; // % da faixa por segundo

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    baseX.set(wrap(-50, 0, baseX.get() + moveBy));
  });

  const x = useTransform(baseX, (value) => `${value}%`);

  return (
    <div className="marquee" aria-label="Conceitos que orientam a BuildersWay">
      <motion.div
        className="marquee__track"
        style={reduceMotion ? undefined : { x }}
      >
        <div className="marquee__item">
          <Sequence />
        </div>
        <div className="marquee__item" aria-hidden="true">
          <Sequence />
        </div>
      </motion.div>
    </div>
  );
}
