"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type MotionDivProps = MotionProps & {
    children: ReactNode;
    className?: string;
    tag?: keyof JSX.IntrinsicElements;
};

export function MotionDiv({ children, className, tag = "div", ...props }: MotionDivProps) {
  const MotionComponent = motion[tag];

  return (
    <MotionComponent className={className} {...props}>
      {children}
    </MotionComponent>
  );
}
