import { Card } from "../components/ui";
import { equipo, referencias, titulo } from "../data";

export default function Cierre() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3">
        <Card>
          <h3 className="text-lg font-bold">Equipo · Grupo 3743</h3>
          <ul className="mt-3 space-y-1 text-sm">
            {equipo.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Ciberseguridad (750024 C), Escuela de Ingeniería de Sistemas y Computación, Universidad del Valle.
            Docente: Mgs. Claudia Ximena Muñoz Ausecha.
          </p>
        </Card>
        <Card className="lg:col-span-2" delay={0.08}>
          <h3 className="text-lg font-bold">Documentos y fuentes</h3>
          <p className="mt-2 text-sm text-muted">{titulo}.</p>
          <a href="./informe.pdf" target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            Informe completo (PDF)
          </a>
          <ul className="mt-5 space-y-2 text-sm">
            {referencias.map((r) => (
              <li key={r.url} className="leading-snug">
                <a href={r.url} target="_blank" rel="noreferrer" className="text-muted transition hover:text-accent">{r.cita}</a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <p className="pb-8 text-center text-xs text-muted">
        Página estática con fines académicos. No contiene datos reales de usuarios ni credenciales de la Universidad.
      </p>
    </footer>
  );
}
