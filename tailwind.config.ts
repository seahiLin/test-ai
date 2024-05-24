import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border-default)",
        "border-default": "var(--border-default)",
        "border-highlighted": "var(--border-highlighted)",
        "border-disabled": "var(--border-disabled)",
        input: "var(--border-default)",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          blue: "var(--primary-blue)",
          green: "var(--primary-green)",
          red: "var(--primary-red)",
          orange: "var(--primary-orange)",
          "mint-green": "var(--primary-mint-green)",
          "darker-teal": "var(--primary-darker-teal)",
          "teal": "var(--primary-teal)",
          "light-yellow": "var(--primary-light-yellow)",
          brand: "#F04D23",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "var(--surface-default)",
          container: "var(--surface-container)",
          background: "var(--surface-background)",
          select1: "var(--surface-select1)",
          select2: "var(--surface-select2)",
          disabled: "var(--surface-disabled)",
        },
        text: {
          title: "var(--text-title)",
          subtitle: "var(--text-subtitle)",
          body: "var(--text-body)",
          caption: "var(--text-caption)",
          disabled: "var(--text-disabled)",
          "main-btn": "var(--text-main-btn)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        1: "1px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
