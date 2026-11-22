import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge, Card, Section, nivelColor } from "../components/ui";
import { controles, escala, fuentes } from "../data";

const filtros = ["Todos", "Lógico", "Físico"] as const;
const barra = { high: "bg-high", mid: "bg-mid", low: "bg-low" } as const;
const nombreNivel = (v: number) => escala.find((e) => e.valor === v)?.nivel ?? "";

export default function Controles() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");
  const [abierto, setAbierto] = useState<string | null>("A.5.17");
  const lista = controles.filter((c) => filtro === "Todos" || c.tipo === filtro);

  return (
    <Section
      id="controles"
      kicker="Análisis de controles"
      title="Nivel de madurez de cada control"
      intro="Calificamos los 11 controles de acceso del Anexo A con la escala del MSPI (0 a 100). La meta a corto plazo es llegar a Definido (60). Toca un control para ver la observación."
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-line bg-surface p-1" role="tablist">
          {filtros.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filtro === f}
              onClick={() => setFiltro(f)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${filtro === f ? "bg-accent text-white" : "text-muted hover:text-fg"}`}
            >
              {f === "Todos" ? "Todos" : f === "Lógico" ? "Lógicos" : "Físicos"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge tone="high">Inicial (20)</Badge>
          <Badge tone="mid">Repetible (40)</Badge>
          <Badge tone="low">Definido (60)</Badge>
        </div>
      </div>

      <Card className="mt-6">
        <ul className="space-y-1">
          {lista.map((c) => {
            const tono = nivelColor(c.valor);
            const open = abierto === c.id;
            return (
              <li key={c.id}>
                <button
                  onClick={() => setAbierto(open ? null : c.id)}
                  aria-expanded={open}
                  className="grid w-full grid-cols-1 items-center gap-2 rounded-xl px-2 py-2.5 text-left transition hover:bg-line/40 sm:grid-cols-[minmax(0,15rem)_1fr]"
                >
                  <span className="flex items-baseline gap-2 text-sm">
                    <span className="font-mono text-xs text-muted">{c.id}</span>
                    <span className="font-medium">{c.nombre}</span>
                  </span>
                  <span className="relative h-6 rounded-md bg-line/50">
                    <motion.span
                      className={`absolute inset-y-0 left-0 rounded-md ${barra[tono]}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.valor}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    <span className="absolute inset-y-0 left-[60%] w-px border-l-2 border-dashed border-fg/50" aria-hidden />
                    <span className="absolute inset-y-0 right-2 flex items-center text-xs font-semibold text-muted">
                      {nombreNivel(c.valor)} · {c.valor}
                    </span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mx-2 mb-3 rounded-xl border-l-4 border-accent bg-accent/5 px-4 py-3 text-sm leading-relaxed">
                        <p>
                          <span className="mr-2"><Badge tone="muted">{c.tipo}</Badge></span>
                          {c.observacion}
                        </p>
                        <p className="mt-2 text-xs text-muted">
                          Evidencia: {c.evidencia.map((e) => fuentes[e]).join(" · ")}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-muted">
          La línea punteada marca la meta (Definido, 60). Es una valoración preliminar: el grupo la confirmará con la visita
          a las salas cuando reabran tras el sismo.
        </p>
      </Card>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {escala.map((e) => (
          <div key={e.nivel} className="rounded-xl border border-line bg-surface px-3 py-2">
            <p className="font-mono text-xs text-muted">{e.valor}</p>
            <p className="text-sm font-semibold">{e.nivel}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
