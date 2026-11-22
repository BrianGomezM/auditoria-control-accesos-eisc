import { Badge, Card, Section } from "../components/ui";
import { activos, fases, tiposActivo } from "../data";

export default function Metodo() {
  return (
    <Section
      id="metodo"
      kicker="Cómo la hicimos"
      title="Alcance, fases y activos"
      intro={
        <>
          Trabajamos en modalidad de <strong className="text-fg">caja gris</strong>: conocemos las salas como usuarios,
          pero no tenemos acceso a los servidores ni a documentos internos. Seguimos las fases de la ISO 19011, calificamos
          los controles con la escala de madurez del MSPI de MinTIC y clasificamos los activos con MAGERIT.
        </>
      }
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {fases.map((f, i) => (
          <Card key={f.n} delay={i * 0.08} className="relative">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display font-bold text-white">{f.n}</span>
            <h3 className="mt-4 text-lg font-bold">{f.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.texto}</p>
          </Card>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold">Qué entra y qué no</h3>
          <p className="mt-3 text-sm font-semibold text-low">Dentro del alcance</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Estaciones de trabajo, cuentas y credenciales, servicio de autenticación, privilegios, registros de ingreso y de
            sesión, y el acceso físico a las salas.
          </p>
          <p className="mt-4 text-sm font-semibold text-high">Fuera del alcance</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Otros dominios de la norma (continuidad, desarrollo seguro), otras dependencias de la Universidad y la
            certificación del SGSI.
          </p>
        </Card>
        <Card className="lg:col-span-3" delay={0.08}>
          <h3 className="text-lg font-bold">Activos revisados</h3>
          <ul className="mt-4 divide-y divide-line">
            {activos.map((a) => (
              <li key={a.nombre} className="flex items-center justify-between gap-3 py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-10 shrink-0 rounded-md bg-line/60 py-1 text-center font-mono text-xs" title={tiposActivo[a.tipo]}>
                    {a.tipo}
                  </span>
                  <span className="text-sm">{a.nombre}</span>
                </div>
                <Badge tone={a.valor === "Muy alto" ? "high" : a.valor === "Alto" ? "mid" : "muted"}>{a.valor}</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">D: datos · SW: software · HW: hardware · P: personal · L: instalaciones (MAGERIT)</p>
        </Card>
      </div>
    </Section>
  );
}
