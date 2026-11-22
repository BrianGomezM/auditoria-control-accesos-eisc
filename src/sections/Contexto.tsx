import { Card, Section } from "../components/ui";

export default function Contexto() {
  return (
    <Section
      id="contexto"
      kicker="Por qué esta auditoría"
      title="Muchas personas, los mismos equipos"
      intro="Las salas de cómputo de la Escuela de Ingeniería de Sistemas y Computación tienen uso intensivo y alta rotación. Una contraseña débil, una cuenta compartida o una puerta sin registro afectan a todos los que usan la sala."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="font-display text-4xl font-extrabold text-high">39 CPU</p>
          <h3 className="mt-2 text-lg font-bold">desaparecieron de la sala 5</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Entre la noche del 30 de abril y la madrugada del 1 de mayo de 2026 se perdieron 39 CPU de la sala 5 del
            edificio B13. La pérdida se reportó en la mañana y el edificio se cerró para una revisión general.
          </p>
          <a className="mt-3 inline-block text-xs text-accent hover:underline" href="https://www.elpais.com.co/cali/reportan-desaparicion-de-computadores-en-la-universidad-del-valle-esto-fue-lo-que-ocurrio-0450.html" target="_blank" rel="noreferrer">
            Fuente: El País, 4 de mayo de 2026
          </a>
        </Card>
        <Card delay={0.08}>
          <p className="font-display text-4xl font-extrabold text-mid">22 %</p>
          <h3 className="mt-2 text-lg font-bold">de las brechas empiezan con credenciales</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            El informe de Verizon de 2025 ubicó el abuso de credenciales como el vector de acceso inicial más frecuente.
            En una sala compartida, una clave débil abre la puerta a la cuenta de cualquiera.
          </p>
          <a className="mt-3 inline-block text-xs text-accent hover:underline" href="https://www.verizon.com/business/resources/reports/dbir/" target="_blank" rel="noreferrer">
            Fuente: Verizon DBIR 2025
          </a>
        </Card>
        <Card delay={0.16}>
          <p className="font-display text-4xl font-extrabold text-accent">0</p>
          <h3 className="mt-2 text-lg font-bold">políticas de acceso publicadas</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            En los sitios de la Universidad y de la EISC no encontramos una política de control de acceso para las salas.
            Eso incumple el control A.5.15 de la norma y es uno de los hallazgos centrales.
          </p>
          <span className="mt-3 inline-block text-xs text-muted">Revisión de la información pública</span>
        </Card>
      </div>
    </Section>
  );
}
