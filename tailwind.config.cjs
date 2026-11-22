/** @type {import('tailwindcss').Config} */
const themed = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: themed("bg"),
        surface: themed("surface"),
        muted: themed("muted"),
        fg: themed("fg"),
        line: themed("line"),
        accent: themed("accent"),
        accent2: themed("accent2"),
        high: themed("high"),
        mid: themed("mid"),
        low: themed("low"),
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 16px 40px -18px var(--shadow-card)",
      },
      screens: { xs: "450px" },
    },
  },
  plugins: [],
};
