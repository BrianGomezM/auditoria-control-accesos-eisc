import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Section: React.FC<{
  id: string;
  kicker: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, kicker, title, intro, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">{kicker}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {intro && <div className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{intro}</div>}
    </motion.div>
    <div className="mt-10">{children}</div>
  </section>
);

export const Card: React.FC<{ className?: string; children: React.ReactNode; delay?: number }> = ({
  className = "",
  children,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay }}
    className={`rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6 ${className}`}
  >
    {children}
  </motion.div>
);

export const nivelColor = (v: number) => (v <= 20 ? "high" : v <= 40 ? "mid" : "low");

export const Badge: React.FC<{ tone: "high" | "mid" | "low" | "accent" | "muted"; children: React.ReactNode }> = ({
  tone,
  children,
}) => {
  const tones = {
    high: "bg-high/10 text-high ring-high/30",
    mid: "bg-mid/10 text-mid ring-mid/30",
    low: "bg-low/10 text-low ring-low/30",
    accent: "bg-accent/10 text-accent ring-accent/30",
    muted: "bg-line/50 text-muted ring-line",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  );
};

type TTheme = "light" | "dark";
const readTheme = (): TTheme => {
  try {
    const v = window.localStorage.getItem("tema");
    if (v === "light" || v === "dark") return v;
  } catch {
    /* sin almacenamiento */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState<TTheme>(readTheme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    try {
      window.localStorage.setItem("tema", theme);
    } catch {
      /* sin almacenamiento */
    }
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
};
