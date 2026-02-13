import { colors, transitions } from "@/styles/theme";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = `
    font-medium rounded-md transition-all duration-${transitions.normal}
    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variants = {
    primary: `
      bg-[${colors.primary}] text-white 
      hover:bg-[${colors.primary}]/90 
      hover:shadow-xl hover:shadow-[${colors.primaryShadow}]/40
      focus:ring-[${colors.primaryShadow}]
    `,
    secondary: `
      bg-gray-200 text-gray-800 
      hover:bg-gray-300 hover:shadow-lg
      focus:ring-gray-400
    `,
    outline: `
      border-2 border-[${colors.primary}] text-[${colors.primary}]
      hover:bg-[${colors.primary}] hover:text-white
      focus:ring-[${colors.primaryShadow}]
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
