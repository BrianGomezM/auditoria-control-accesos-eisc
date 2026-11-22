import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge, Card, Section } from "../components/ui";
import { cuentas, fasesJtR } from "../data";

const comunes = ["123456", "12345678", "123456789", "password", "qwerty", "admin", "abc123", "111111", "iloveyou", "123123", "000000", "contraseña", "clave", "hola123", "colombia", "teamo"];
const entorno = ["univalle", "valle", "cali", "eisc", "sala", "monitor", "docente", "estudiante", "laboratorio", "sistemas", "ingenieria", "password"];

function evaluar(clave: string) {
  const bajo = clave.toLowerCase();
  const chequeos = [
    { ok: clave.length >= 15, texto: "Tiene 15 caracteres o más (lo que pide NIST cuando la contraseña es el único factor)" },
    { ok: !comunes.includes(bajo), texto: "No está en la lista de contraseñas más comunes" },
    { ok: !entorno.some((p) => bajo.includes(p)) && !/20(1|2)\d/.test(bajo), texto: "No usa palabras de la Universidad ni años (Univalle, Cali, sala, 2025…)" },
    { ok: !/^[a-záéíóúñ]+\d{0,4}[!*.]?$/i.test(clave), texto: "No es una palabra seguida de unos pocos números" },
  ];
  const fallas = chequeos.filter((c) => !c.ok).length;
  const veredicto = clave.length === 0 ? null : fallas === 0 ? "Aceptable" : fallas === 1 && clave.length >= 15 ? "Mejorable" : "Débil";
  return { chequeos, veredicto };
}

export default function Contrasenas() {
  const [fase, setFase] = useState(0);
  const [auto, setAuto] = useState(false);
  const [clave, setClave] = useState("");
  const ev = useMemo(() => evaluar(clave), [clave]);

  useEffect(() => {
    if (!auto) return;
    if (fase >= 4) { setAuto(false); return; }
    const t = setTimeout(() => setFase((f) => f + 1), 1300);
    return () => clearTimeout(t);
  }, [auto, fase]);

  const caidas = cuentas.filter((c) => c.fase !== null && c.fase <= fase);
  const actual = fasesJtR.find((f) => f.id === fase);

  return (
    <Section
      id="contrasenas"
      kicker="Evidencia técnica"
      title="Prueba de contraseñas con John the Ripper"
      intro="Creamos 10 cuentas ficticias en un Ubuntu aislado, generamos sus hashes con SHA-512 crypt y las atacamos en cuatro fases con John the Ripper 1.9.0. Ninguna corresponde a una cuenta real. Avanza fase por fase para ver qué cayó."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-2">
            {fasesJtR.map((f) => (
              <button
                key={f.id}
                onClick={() => { setAuto(false); setFase(f.id); }}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${fase >= f.id ? "border-accent bg-accent/10" : "border-line bg-surface hover:border-accent/60"}`}
              >
                <span className="block font-mono text-xs text-muted">Fase {f.id}</span>
                <span className="font-semibold">{f.nombre}</span>
              </button>
            ))}
            <button
              onClick={() => { setFase(0); setAuto(true); }}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Reproducir
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-[#0f141c] shadow-card">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-white/50">laboratorio@ubuntu: ~/lab_jtr</span>
            </div>
            <div className="min-h-[260px] overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">
              <p className="text-white/50">Loaded 10 password hashes with 10 different salts (crypt, generic crypt(3))</p>
              {fasesJtR.filter((f) => f.id <= fase).map((f) => (
                <div key={f.id} className="mt-2">
                  <p className="whitespace-nowrap text-sky-300">$ {f.comando}</p>
                  {cuentas.filter((c) => c.fase === f.id).map((c) => (
                    <motion.p key={c.usuario} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="whitespace-pre text-lime-300">
                      {c.clave.padEnd(17)}({c.usuario})
                    </motion.p>
                  ))}
                  {cuentas.every((c) => c.fase !== f.id) && <p className="text-white/50">Sin contraseñas nuevas en {f.duracion}</p>}
                </div>
              ))}
              {fase === 0 && <p className="mt-2 text-white/50">Elige una fase o pulsa Reproducir.</p>}
              {fase === 4 && <p className="mt-2 text-lime-300">8 password hashes cracked, 2 left</p>}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {actual && (
              <motion.p key={actual.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-muted">
                <strong className="text-fg">Fase {actual.id} ({actual.duracion}).</strong> {actual.explicacion}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Card className="lg:col-span-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-bold">Cuentas de prueba</h3>
            <p className="font-display text-2xl font-extrabold">
              <span className="text-high">{caidas.length}</span><span className="text-muted"> / 10</span>
            </p>
          </div>
          <ul className="mt-3 divide-y divide-line">
            {cuentas.map((c) => {
              const cayo = c.fase !== null && c.fase <= fase;
              return (
                <li key={c.usuario} className="flex items-center justify-between gap-2 py-2">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted">{c.usuario}</p>
                    <p className={`truncate text-sm ${cayo ? "font-semibold" : "text-muted"}`}>
                      {cayo ? c.clave : c.fase === null && fase === 4 ? c.clave : "••••••••"}
                    </p>
                  </div>
                  {cayo ? (
                    <Badge tone={c.robustez === "Crítica" ? "high" : "mid"}>Fase {c.fase} · {c.robustez}</Badge>
                  ) : fase === 4 ? (
                    <Badge tone="low">Resistió</Badge>
                  ) : (
                    <Badge tone="muted">Sin descifrar</Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-lg font-bold">Lo que aprendimos</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            El diccionario genérico no encontró <span className="font-mono text-fg">Univalle2025</span> ni{" "}
            <span className="font-mono text-fg">Sala5cali</span> en más de 20 minutos. Una lista de solo 1.034 palabras del
            entorno (Univalle, Cali, EISC, sala y número, roles, años) las sacó en 4,4 segundos. Resistieron únicamente la
            frase de paso de 25 caracteres y la clave aleatoria de 13. Por eso la política que proponemos pide longitud y
            bloquea las palabras propias de la Universidad, en lugar de exigir símbolos o cambios cada mes.
          </p>
        </Card>
        <Card delay={0.08}>
          <h3 className="text-lg font-bold">Prueba una contraseña con la política propuesta</h3>
          <p className="mt-1 text-xs text-muted">Todo se calcula en tu navegador y no se envía a ningún lado. Aun así, no escribas una contraseña que uses de verdad.</p>
          <input
            type="text"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder="Ejemplo: Univalle2025"
            autoComplete="off"
            spellCheck={false}
            className="mt-3 w-full rounded-xl border border-line bg-bg px-4 py-2.5 font-mono text-sm outline-none focus:border-accent"
          />
          <ul className="mt-3 space-y-1.5">
            {ev.chequeos.map((c) => (
              <li key={c.texto} className="flex items-start gap-2 text-sm">
                <span className={`mt-0.5 h-4 w-4 shrink-0 rounded-full ${clave ? (c.ok ? "bg-low" : "bg-high") : "bg-line"}`} />
                <span className={clave ? "" : "text-muted"}>{c.texto}</span>
              </li>
            ))}
          </ul>
          {ev.veredicto && (
            <p className="mt-3 text-sm">
              Resultado:{" "}
              <Badge tone={ev.veredicto === "Aceptable" ? "low" : ev.veredicto === "Mejorable" ? "mid" : "high"}>{ev.veredicto}</Badge>
            </p>
          )}
        </Card>
      </div>
    </Section>
  );
}
