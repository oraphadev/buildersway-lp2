import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  small?: boolean;
  withArrow?: boolean;
  target?: string;
  rel?: string;
};

function Arrow() {
  return (
    <svg
      className="btn__arrow"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  small = false,
  withArrow = false,
  target,
  rel,
}: ButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={`btn btn--${variant}${small ? " btn--small" : ""}`}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      {children}
      {withArrow && <Arrow />}
    </motion.a>
  );
}
