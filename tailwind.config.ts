import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Light mode colors
        "bg-light": "#ffffff",
        "text-light": "#1a202c",
        "card-bg-light": "#f9fafb",
        "border-light": "#e2e8f0",

        // Dark mode colors
        "bg-dark": "#111827",
        "text-dark": "#f7fafc",
        "card-bg-dark": "#1f2937",
        "border-dark": "#374151",

        // Accent colors
        "accent-500": "#6366f1",
        "accent-600": "#4f46e5",

        // Additional colors for both modes
        "text-secondary-light": "#4a5568",
        "text-secondary-dark": "#d1d5db",

        "success-light": "#10b981",
        "success-dark": "#059669",

        "warning-light": "#f59e0b",
        "warning-dark": "#d97706",

        "error-light": "#ef4444",
        "error-dark": "#dc2626",
      },
    },
  },
  plugins: [],
};
export default config;
