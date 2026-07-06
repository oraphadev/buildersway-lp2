import {
  motion,
  transform,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import narrativeMist from "../assets/narrative-mist.webp";

const LINES: ReactNode[] = [
  <>O mercado evolui em velocidade crescente. Novas tecnologias surgem constantemente e processos tornam-se obsoletos.</>,
  <>A maioria das empresas sabe que precisa evoluir. <strong>Poucas sabem exatamente como.</strong></>,
  <>Existe excesso de informação técnica e escassez de direcionamento estratégico.</>,
  <>
    <span className="narrative__closing">
      A BuildersWay existe para preencher essa lacuna.
    </span>
  </>,
];

type StoryLineProps = {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: ReactNode;
};

function StoryLine({ progress, index, total, children }: StoryLineProps) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const fadeInEnd = start + step * 0.35;
  const fadeOutStart = end - step * 0.2;

  // Transforms baseados em função para forçar o caminho JS do Motion:
  // dentro de position:sticky, a compilação para ScrollTimeline nativa
  // calcula ranges incorretos e as linhas se sobrepõem.
  const mapOpacity = transform(
    isFirst
      ? [start, fadeOutStart, end]
      : isLast
        ? [start, fadeInEnd, 1]
        : [start, fadeInEnd, fadeOutStart, end],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const mapY = transform(
    isFirst
      ? [start, fadeOutStart, end]
      : isLast
        ? [start, fadeInEnd]
        : [start, fadeInEnd, fadeOutStart, end],
    isFirst ? [0, 0, -56] : isLast ? [56, 0] : [56, 0, 0, -56],
  );

  const mapBlur = transform(
    isFirst
      ? [start, fadeOutStart, end]
      : isLast
        ? [start, fadeInEnd]
        : [start, fadeInEnd, fadeOutStart, end],
    isFirst ? [0, 0, 10] : isLast ? [10, 0] : [10, 0, 0, 10],
  );

  const opacity = useTransform(progress, (value) => mapOpacity(value));
  const y = useTransform(progress, (value) => mapY(value));
  const filter = useTransform(progress, (value) => `blur(${mapBlur(value)}px)`);

  return (
    <motion.p className="narrative-sticky__line" style={{ opacity, y, filter }}>
      {children}
    </motion.p>
  );
}

export function PainNarrative() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Suaviza os ticks discretos do wheel/trackpad; sem isso os transforms
  // saltam de um evento de scroll para o outro e a seção parece travada.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
    restDelta: 0.001,
  });

  // Névoa ambiente: deriva lentamente na direção oposta ao scroll.
  const mistOpacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.85, 1],
    [0, 0.5, 0.5, 0],
  );
  const mistY = useTransform(smoothProgress, [0, 1], [-48, 48]);
  const mistScale = useTransform(smoothProgress, [0, 1], [1.08, 1.18]);

  if (reduceMotion) {
    return (
      <section className="section-large padding-global">
        <div className="narrative container-medium">
          {LINES.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="narrative-sticky">
      <div className="narrative-sticky__viewport padding-global">
        <motion.img
          src={narrativeMist}
          alt=""
          aria-hidden="true"
          className="section-art narrative-sticky__bg"
          loading="lazy"
          decoding="async"
          style={{ opacity: mistOpacity, y: mistY, scale: mistScale }}
        />
        <div className="narrative-sticky__stage container-medium">
          {LINES.map((line, index) => (
            <StoryLine
              key={index}
              progress={smoothProgress}
              index={index}
              total={LINES.length}
            >
              {line}
            </StoryLine>
          ))}
        </div>
      </div>
    </section>
  );
}
