import { colors } from "@/styles/theme";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "default" | "primary" | "white";
  id?: string;
}

const bgColors = {
  default: colors.background,
  primary: colors.primary,
  white: colors.white,
};

export default function Section({
  children,
  className = "",
  background = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 px-6 ${className}`}
      style={{ backgroundColor: bgColors[background] }}
    >
      {children}
    </section>
  );
}
