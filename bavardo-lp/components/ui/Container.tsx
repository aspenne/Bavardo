import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  className = "",
  maxWidth = "2xl",
}: ContainerProps) {
  return (
    <div className={`${maxWidthClasses[maxWidth]} mx-auto ${className}`}>
      {children}
    </div>
  );
}
