import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "./ui/Reveal";

const ITEMS = [
  {
    question: "O que a BuildersWay faz?",
    answer:
      "Ajudamos empresas a evoluírem através da IA: compreensão profunda do negócio, diagnóstico estratégico, definição de prioridades e implementação de soluções personalizadas. Não vendemos tecnologia, resolvemos problemas.",
  },
  {
    question: "A BuildersWay vende projetos de IA?",
    answer:
      "Não. Vendemos soluções. Algumas usam IA intensivamente, outras parcialmente, outras podem nem usar IA se existir alternativa mais adequada.",
  },
  {
    question: "A BuildersWay possui soluções prontas?",
    answer:
      "Não. Toda solução é construída após diagnóstico; problemas semelhantes podem resultar em soluções diferentes.",
  },
  {
    question: "O diagnóstico é obrigatório?",
    answer:
      "Na filosofia da BuildersWay, sim. Sem compreensão adequada, recomendações tornam-se especulação.",
  },
  {
    question: "A BuildersWay realiza apenas consultoria?",
    answer:
      "Não. Sempre que fizer sentido, também executamos a implementação. Preferimos acompanhar toda a jornada, da estratégia à entrega.",
  },
  {
    question: "A BuildersWay atende apenas empresas de tecnologia?",
    answer:
      "Não. A metodologia é independente de segmento; tecnologia é apenas o foco inicial de comunicação.",
  },
  {
    question: "Como a BuildersWay mede sucesso?",
    answer:
      "Pelo impacto gerado. Tecnologia entregue não é sucesso; resultados percebidos são.",
  },
];

/* Padrão Stitch: ícone "+" que vira "×" por rotação de 45°. */
function PlusIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      className="faq__icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <path
        d="M8 2v12M2 8h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="section-large padding-global">
      <div className="container-small">
        <header className="faq__header">
          <Reveal>
            <p className="eyebrow">FAQ</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-h2">Perguntas frequentes</h2>
          </Reveal>
        </header>
        <Reveal delay={0.15}>
          <div className="faq__list">
            {ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className="faq__item">
                  <button
                    className="faq__question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <PlusIcon open={isOpen} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={
                          reduceMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={
                          reduceMotion
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="faq__answer-inner">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
