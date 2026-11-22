import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge, Card, Section } from "../components/ui";
import { tecnologias } from "../data";

type Paso = { titulo: string; detalle: string; tono: "ok" | "alerta" | "info" };
const escenarios: Record<string, { nombre: string; pasos: Paso[] }> = {
  horario: {
    nombre: "Estudiante en horario de clase",
    pasos: [
      { titulo: "Acerca el carné al lector", detalle: "El lector de la puerta lee el código QR o el chip NFC del carné institucional.", tono: "info" },
      { titulo: "El sistema verifica", detalle: "Revisa que la persona esté activa y que la sala esté abierta para su grupo a esa hora.", tono: "info" },
      { titulo: "Se abre la puerta", detalle: "La cerradura electrónica libera la puerta y queda registro de quién entró y a qué hora.", tono: "ok" },
      { titulo: "Inicia sesión con su cuenta", detalle: "Cuenta individual del directorio institucional; nada de cuentas genéricas por sala.", tono: "info" },
      { titulo: "Todo queda en el registro central", detalle: "Ingreso a la sala, inicio de sesión e intentos fallidos se guardan para revisión de TI.", tono: "ok" },
    ],
  },
  noche: {
    nombre: "Intento de ingreso a medianoche",
    pasos: [
      { titulo: "Alguien intenta abrir la sala", detalle: "Con un carné o forzando la puerta a las 12:30 a. m., fuera del horario autorizado.", tono: "info" },
      { titulo: "El sistema niega el acceso", detalle: "Ninguna persona tiene permiso a esa hora; la cerradura no se libera.", tono: "alerta" },
      { titulo: "La cámara graba y suena la alarma", detalle: "La apertura fuera de horario dispara la alarma conectada a la sección de seguridad.", tono: "alerta" },
      { titulo: "Vigilancia recibe el aviso", detalle: "El guardia llega en minutos y no a la mañana siguiente, como pasó con la sala 5.", tono: "ok" },
      { titulo: "Queda evidencia", detalle: "El evento, la hora y el video quedan en el registro central para la investigación.", tono: "ok" },
    ],
  },
};
const toneCls = { ok: "border-low bg-low/10", alerta: "border-high bg-high/10", info: "border-accent bg-accent/10" };

export default function Propuesta() {
  const [esc, setEsc] = useState<keyof typeof escenarios>("horario");
  const [paso, setPaso] = useState(0);
  const [tec, setTec] = useState("qr");
  const [run, setRun] = useState(0);
  const pasos = escenarios[esc].pasos;
  const t = tecnologias.find((x) => x.id === tec)!;

  useEffect(() => {
    setPaso(0);
    const id = setInterval(() => setPaso((p) => (p < pasos.length - 1 ? p + 1 : p)), 1500);
    return () => clearInterval(id);
  }, [esc, run, pasos.length]);

  return (
    <Section
      id="propuesta"
      kicker="Propuesta"
      title="Cómo debería funcionar el acceso a las salas"
      intro="Combinamos el carné institucional (QR o NFC) con registro electrónico, cámara en la entrada y cuentas individuales. La huella dactilar queda para una segunda fase porque es un dato sensible y exige autorización de cada persona. Elige un escenario para verlo paso a paso."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="inline-flex flex-wrap rounded-xl border border-line bg-surface p-1">
            {Object.entries(escenarios).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setEsc(k as keyof typeof escenarios)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${esc === k ? "bg-accent text-white" : "text-muted hover:text-fg"}`}
              >
                {v.nombre}
              </button>
            ))}
          </div>
          <ol className="relative mt-6 space-y-3 border-l-2 border-line pl-6">
            {pasos.map((p, i) => (
              <motion.li
                key={`${esc}-${i}`}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: i <= paso ? 1 : 0.25 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-xl border-l-4 p-3 ${i <= paso ? toneCls[p.tono] : "border-line bg-surface"}`}
              >
                <span className={`absolute -left-[35px] top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${i <= paso ? "bg-accent" : "bg-line"}`}>
                  {i + 1}
                </span>
                <p className="font-semibold">{p.titulo}</p>
                <p className="mt-0.5 text-sm text-muted">{p.detalle}</p>
              </motion.li>
            ))}
          </ol>
          <button onClick={() => setRun((r) => r + 1)} className="mt-3 text-xs text-accent hover:underline">
            Ver de nuevo desde el paso 1
          </button>
        </div>

        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold">Opciones que comparamos</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tecnologias.map((x) => (
              <button
                key={x.id}
                onClick={() => setTec(x.id)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${tec === x.id ? "border-accent bg-accent text-white" : "border-line hover:border-accent"}`}
              >
                {x.nombre}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={t.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-xl font-bold">{t.nombre}</p>
                {t.propuesta ? <Badge tone="accent">Propuesta · {t.propuesta}</Badge> : <Badge tone="muted">No priorizada</Badge>}
              </div>
              <p className="mt-2 text-sm text-muted">{t.como}</p>
              <p className="mt-4 text-sm font-semibold text-low">Ventajas</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">{t.ventajas.map((v) => <li key={v}>{v}</li>)}</ul>
              <p className="mt-3 text-sm font-semibold text-high">Limitaciones</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">{t.limites.map((v) => <li key={v}>{v}</li>)}</ul>
              <p className="mt-4 text-sm">
                Costo relativo: <span className="font-mono tracking-widest text-accent">{"$".repeat(t.costo)}</span>
                <span className="font-mono tracking-widest text-line">{"$".repeat(3 - t.costo)}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </Section>
  );
}
