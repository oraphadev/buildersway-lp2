import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import statementOrb from "../assets/statement-orb.webp";

export function Statement() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);

  const orbScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const orbOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <section
      ref={sectionRef}
      className="statement-section section-large padding-global"
    >
      <div className="statement__orb-wrap" aria-hidden="true">
        <motion.div
          style={
            reduceMotion
              ? { opacity: 0.3 }
              : { scale: orbScale, opacity: orbOpacity }
          }
        >
          <motion.img
            src={statementOrb}
            alt=""
            className="statement__orb"
            loading="lazy"
            decoding="async"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 120, repeat: Infinity, ease: "linear" }
            }
          />
        </motion.div>
      </div>
      <motion.div
        className="statement container-medium"
        style={reduceMotion ? undefined : { scale, opacity, y }}
      >
        <p className="eyebrow">Nossa filosofia</p>
        <h2 className="heading-h2">
          Nós pensamos.{" "}
          <span className="text-gradient">A IA torna real.</span>
        </h2>
        <p className="text-medium text-muted">
          Empresas não contratam Inteligência Artificial. Empresas contratam
          evolução. A IA apenas a tornou mais rápida.
        </p>
      </motion.div>
    </section>
  );
}
