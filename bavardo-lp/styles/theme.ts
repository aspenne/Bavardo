// Bavardo Theme Configuration

export const colors = {
  primary: "#003E3A",
  primaryShadow: "#478577",
  background: "#FEFEFE",
  white: "#FFFFFF",
  black: "#171717",

  // Text colors
  textPrimary: "#171717",
  textSecondary: "#4B5563",
  textLight: "#6B7280",
  textMuted: "#9CA3AF",

  // UI colors
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  // Accent colors
  yellow: "#FBBF24",
  yellowDark: "#F59E0B",
} as const;

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
  "5xl": "8rem", // 128px
} as const;

export const borderRadius = {
  sm: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
} as const;

export const fontSize = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  primary: "0 10px 15px -3px rgba(71, 133, 119, 0.3)",
  primaryLg: "0 20px 25px -5px rgba(71, 133, 119, 0.4)",
} as const;

export const transitions = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const animations = {
  fadeInUp: "fadeInUp 0.6s ease-out forwards",
  fadeIn: "fadeIn 0.6s ease-out forwards",
  slideInLeft: "slideInLeft 0.6s ease-out forwards",
  slideInRight: "slideInRight 0.6s ease-out forwards",
} as const;
