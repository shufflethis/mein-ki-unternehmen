import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-black": "#0D0D0D",
        "brand-green": "#bbd8a7",
        "brand-green-hover": "#a5c891",
        "brand-iris": "#a387c1",
        "brand-greige": "#D5CDC3",
        "brand-dusty-green": "#DDEBD3",
        "brand-light-mauve": "#C9B1D3",
        "brand-icy-blue": "#DEEBF7",
        "brand-light-orange": "#F8CBAD",
      },
      fontFamily: {
        futura: ["Futura", "Trebuchet MS", "sans-serif"],
        "open-sans": ["Open Sans", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.5s ease-out forwards",
        slideIn: "slideIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
