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
        "vc-dark": "#08080f",
        "vc-dark2": "#0f0f1a",
        "vc-purple": "#7c3aed",
        "vc-pink": "#ec4899",
        "vc-cyan": "#06b6d4",
        "vc-muted": "#94a3b8",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        syne: ["Syne", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeInUp 0.6s ease forwards",
        "fade-left": "fadeInLeft 0.6s ease forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "orb-float": "orb-float 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(124,58,237,0.8)" },
        },
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
