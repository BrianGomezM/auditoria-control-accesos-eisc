import { useEffect, useState } from "react";
import { useTheme } from "./components/ui";
import Hero from "./sections/Hero";
import Contexto from "./sections/Contexto";
import Metodo from "./sections/Metodo";
import Controles from "./sections/Controles";
import Riesgos from "./sections/Riesgos";
import Contrasenas from "./sections/Contrasenas";
import Propuesta from "./sections/Propuesta";
import Plan from "./sections/Plan";
import Cierre from "./sections/Cierre";

const enlaces = [
  ["contexto", "Contexto"],
  ["metodo", "Método"],
  ["controles", "Controles"],
  ["riesgos", "Riesgos"],
  ["contrasenas", "Contraseñas"],
  ["propuesta", "Propuesta"],
  ["plan", "Plan"],
] as const;

export default function App() {
  const { theme, toggle } = useTheme();
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          scrolled || abierto ? "border-b border-line bg-bg/85 backdrop-blur" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#inicio" className="flex items-center gap-2 font-display font-bold">
            <img src="./escudo.svg" alt="" className="h-7 w-7" />
            <span>Auditoría Salas EISC</span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {enlaces.map(([id, txt]) => (
              <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-line/50 hover:text-fg">
                {txt}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              className="rounded-lg border border-line p-2 text-muted transition hover:text-fg"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
              )}
            </button>
            <button
              onClick={() => setAbierto((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={abierto}
              className="rounded-lg border border-line p-2 text-muted lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={abierto ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
            </button>
          </div>
        </nav>
        {abierto && (
          <div className="border-t border-line px-4 pb-4 lg:hidden">
            {enlaces.map(([id, txt]) => (
              <a key={id} href={`#${id}`} onClick={() => setAbierto(false)} className="block rounded-lg px-3 py-2.5 text-muted hover:bg-line/50 hover:text-fg">
                {txt}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <Hero />
        <Contexto />
        <Metodo />
        <Controles />
        <Riesgos />
        <Contrasenas />
        <Propuesta />
        <Plan />
      </main>
      <Cierre />
    </div>
  );
}
