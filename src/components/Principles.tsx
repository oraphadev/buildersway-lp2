import { Reveal } from "./ui/Reveal";

const PRINCIPLES = [
  {
    title: "O negócio antes da tecnologia",
    description:
      "Nunca iniciamos uma conversa propondo solução: primeiro o problema, depois os objetivos, só então a tecnologia.",
  },
  {
    title: "Compreender antes de construir",
    description:
      "Construir rapidamente a solução errada desperdiça tempo, dinheiro e confiança. Diagnóstico não é burocracia, é engenharia.",
  },
  {
    title: "Resultados acima de tudo",
    description:
      "Software, automação e IA não são sucesso. Resultado é sucesso. Toda iniciativa deve ter impacto claro e mensurável.",
  },
  {
    title: "ROI acima de hype",
    description:
      "Nenhuma decisão baseada em tendências. Toda tecnologia deve justificar sua existência através de retorno para o cliente.",
  },
  {
    title: "Simplicidade vence",
    description:
      "A solução ideal resolve completamente o problema com o menor nível possível de complexidade.",
  },
  {
    title: "Honestidade constrói parcerias",
    description:
      "Se uma tecnologia não for a melhor solução para você, não será recomendada, mesmo que isso reduza o escopo comercial.",
  },
];

export function Principles() {
  return (
    <section id="principios" className="section-large padding-global">
      <div className="container-large">
        <header className="principles__header">
          <Reveal>
            <p className="eyebrow">Princípios</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-h2">
              O que orienta{" "}
              <span className="text-gradient-ivory">cada decisão</span>.
            </h2>
          </Reveal>
        </header>
        <ul className="principles__list">
          {PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.05}>
              <li className="principles__item">
                <span className="principles__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
