import { motion } from "framer-motion";
import { Card, Section } from "../components/ui";
import { plan } from "../data";

const meses = [1, 2, 3, 4, 5, 6];

export default function Plan() {
  return (
    <Section
      id="plan"
      kicker="Plan de tratamiento"
      title="Seis meses para subir el nivel de los controles"
      intro="Las acciones de los dos primeros meses son de configuración y documentación y no requieren comprar equipos. Las que llevan lector, cámaras o integración quedan desde el tercer mes."
    >
      <Card className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[minmax(0,1fr)_repeat(6,3.5rem)] items-end gap-x-1 border-b border-line pb-2 text-xs text-muted">
            <span>Acción</span>
            {meses.map((m) => <span key={m} className="text-center">Mes {m}</span>)}
          </div>
          <ul>
            {plan.map((a, k) => (
              <li key={a.accion} className="grid grid-cols-[minmax(0,1fr)_repeat(6,3.5rem)] items-center gap-x-1 border-b border-line/60 py-2.5">
                <div className="pr-3">
                  <p className="text-sm font-medium">{a.accion}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    <span className="font-mono">{a.control}</span> · {a.responsable}
                  </p>
                </div>
                <div className="relative col-span-6 h-7">
                  <motion.div
                    className={`absolute inset-y-1 rounded-md ${a.compra ? "bg-accent2/70" : "bg-accent"}`}
                    style={{ left: `${(a.inicio / 6) * 100}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((a.fin - a.inicio) / 6) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: k * 0.06 }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
            <span className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-accent" /> Configuración y documentación</span>
            <span className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-accent2/70" /> Requiere equipos o integración</span>
          </div>
        </div>
      </Card>
    </Section>
  );
}
