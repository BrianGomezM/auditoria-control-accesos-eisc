import { motion } from "framer-motion";
import { cifras } from "../data";

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate pt-28 sm:pt-32">
      <div className="grid-bg absolute inset-0 -z-10 h-[520px]" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent2" />
            <span>Ciberseguridad 750024 C · Grupo 3743 · Universidad del Valle</span>
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            ¿Quién entra a las <span className="text-gradient">salas de cómputo</span> de la EISC, y quién usa sus equipos?
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            Auditamos el control de accesos lógico y físico de las salas frente a la norma ISO/IEC 27001:2022. Aquí están
            los activos que revisamos, el nivel de cada control, los riesgos, una prueba real de contraseñas y la propuesta
            para mejorar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#controles" className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:opacity-90">
              Ver resultados
            </a>
            <a href="./informe.pdf" target="_blank" rel="noreferrer" className="rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold transition hover:border-accent">
              Descargar informe (PDF)
            </a>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cifras.map((c, i) => (
            <motion.div
              key={c.etiqueta}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="rounded-2xl border border-line bg-surface p-4 shadow-card sm:p-5"
            >
              <p className="font-display text-3xl font-extrabold sm:text-4xl">{c.valor}</p>
              <p className="mt-1 text-sm font-medium">{c.etiqueta}</p>
              <p className="mt-1 text-xs text-muted">{c.detalle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
