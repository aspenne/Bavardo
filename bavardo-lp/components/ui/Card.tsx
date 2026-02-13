import { colors, transitions } from "@/styles/theme";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: "default" | "primary";
}

export default function Card({
  children,
  className = "",
  hoverable = false,
  variant = "default",
}: CardProps) {
  const baseStyles = `
    p-8 rounded-lg 
    transition-all duration-${transitions.normal}
  `;

  const hoverStyles = hoverable
    ? `
    hover:-translate-y-2 
    hover:shadow-xl hover:shadow-[${colors.primaryShadow}]/20
  `
    : "";

  const variants = {
    default: `
      bg-white shadow-md
    `,
    primary: `
      bg-[${colors.primary}] text-white
      shadow-lg shadow-[${colors.primaryShadow}]/30
    `,
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
