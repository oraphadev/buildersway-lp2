import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import ctaAurora from "../assets/cta-aurora.webp";

export function CTASection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const auroraY = useTransform(scrollYProgress, [0, 1], [-72, 0]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.65]);

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="cta section-large padding-global"
    >
      <motion.img
        src={ctaAurora}
        alt=""
        aria-hidden="true"
        className="section-art cta__aurora"
        loading="lazy"
        decoding="async"
        style={
          reduceMotion
            ? { opacity: 0.55 }
            : { y: auroraY, opacity: auroraOpacity }
        }
      />
      <motion.div
        className="cta__glow"
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: glowY, opacity: glowOpacity }}
      />
      <div className="cta__content container-medium">
        <Reveal>
          <h2 className="heading-h2">
            Vamos conversar sobre o{" "}
            <span className="text-gradient">seu negócio</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-medium text-muted">
            Toda relação começa pelo problema, nunca pela tecnologia. Conte-nos
            o contexto do seu negócio e descubra o que faz sentido construir.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Button
            href="https://wa.me/5522988316821"
            target="_blank"
            rel="noopener noreferrer"
            withArrow
          >
            Fale conosco
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
