import { useState } from "react";
import { motion } from "framer-motion";
import { Badge, Card, Section } from "../components/ui";
import { riesgos } from "../data";

const etiquetas = ["Bajo", "Medio", "Alto"];
const nivel = (s: number) => (s >= 6 ? "Alto" : s >= 3 ? "Medio" : "Bajo");
const celda = (s: number) => (s >= 6 ? "bg-high/20 border-high/40" : s >= 3 ? "bg-mid/20 border-mid/40" : "bg-low/15 border-low/40");

export default function Riesgos() {
  const [sel, setSel] = useState<{ p: number; i: number } | null>({ p: 3, i: 3 });
  const visibles = sel ? riesgos.filter((r) => r.p === sel.p && r.i === sel.i) : riesgos;

  return (
    <Section
      id="riesgos"
      kicker="Análisis de riesgos"
      title="Matriz de calor"
      intro="Cada riesgo se calcula como probabilidad por impacto, ambos de 1 a 3. De 6 a 9 es alto, de 3 a 4 medio y de 1 a 2 bajo. El impacto es el valor más alto entre confidencialidad, integridad y disponibilidad. Toca una celda para ver sus riesgos."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <div className="flex">
            <div className="flex w-8 items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap text-xs font-semibold text-muted">Probabilidad</span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1.5">
                {[3, 2, 1].map((p) => (
                  <div key={p} className="contents">
                    <span className="flex items-center pr-1 text-xs text-muted">{["Baja", "Media", "Alta"][p - 1]}</span>
                    {[1, 2, 3].map((i) => {
                      const ids = riesgos.filter((r) => r.p === p && r.i === i).map((r) => r.id);
                      const activo = sel?.p === p && sel?.i === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setSel(activo ? null : { p, i })}
                          aria-pressed={activo}
                          aria-label={`Probabilidad ${p}, impacto ${i}: ${ids.length} riesgos`}
                          className={`relative aspect-square rounded-lg border-2 text-sm font-bold transition ${celda(p * i)} ${activo ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : "hover:scale-[1.03]"}`}
                        >
                          <span className="absolute right-1.5 top-1 text-[10px] font-normal text-muted">{p * i}</span>
                          {ids.join(" ")}
                        </button>
                      );
                    })}
                  </div>
                ))}
                <span />
                {etiquetas.map((e) => (
                  <span key={e} className="text-center text-xs text-muted">{e}</span>
                ))}
              </div>
              <p className="mt-1 text-center text-xs font-semibold text-muted">Impacto</p>
            </div>
          </div>
          <button onClick={() => setSel(null)} className="mt-4 text-xs text-accent hover:underline">
            Ver los 7 riesgos
          </button>
        </Card>

        <div className="space-y-3 lg:col-span-3">
          {visibles.length === 0 && (
            <Card><p className="text-sm text-muted">No hay riesgos en esta celda.</p></Card>
          )}
          {visibles.map((r, k) => {
            const s = r.p * r.i;
            const n = nivel(s);
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: k * 0.05 }}
                className="rounded-2xl border border-line bg-surface p-4 shadow-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display font-bold">
                    <span className="mr-2 font-mono text-sm text-muted">{r.id}</span>
                    {r.amenaza}
                  </p>
                  <Badge tone={n === "Alto" ? "high" : n === "Medio" ? "mid" : "low"}>
                    {n} · {r.p} × {r.i} = {s}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted">Activo: {r.activo}</p>
                <div className="mt-3 flex gap-2 text-xs">
                  {["C", "I", "D"].map((x, j) => (
                    <span key={x} className="rounded-md bg-line/50 px-2 py-1">
                      <strong>{x}</strong> {r.cid[j]}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
