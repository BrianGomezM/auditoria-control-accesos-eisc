// Datos de la auditoría. Son los mismos del informe (versión 2, noviembre de 2026).

export const equipo = [
  "Néstor David Heredia Gutiérrez",
  "Miguel Ángel Moreno Romero",
  "Juan José Moreno Jaramillo",
  "Héctor Luis Díaz Hurtado",
  "Brayan Julio Gómez Muñoz",
  "Juan Pablo Charry Ramírez",
];

export const titulo =
  "Auditoría de seguridad de la información en las salas de cómputo de la EISC, con énfasis en el control de accesos, según la norma ISO/IEC 27001:2022";

export const cifras = [
  { valor: "11", etiqueta: "controles de acceso evaluados", detalle: "Anexo A de ISO/IEC 27001:2022" },
  { valor: "5", etiqueta: "controles en nivel inicial", detalle: "contraseñas, autenticación y registros" },
  { valor: "5 de 7", etiqueta: "riesgos con nivel alto", detalle: "probabilidad por impacto ≥ 6" },
  { valor: "8 de 10", etiqueta: "contraseñas de prueba recuperadas", detalle: "con John the Ripper" },
];

export type Fase = { n: number; titulo: string; texto: string };
export const fases: Fase[] = [
  { n: 1, titulo: "Inicio y planificación", texto: "Definimos el alcance (solo las salas de cómputo), los criterios de la norma y las listas de chequeo." },
  { n: 2, titulo: "Ejecución y evidencia", texto: "Observación de las salas, entrevistas a monitores y la prueba controlada de contraseñas." },
  { n: 3, titulo: "Informe y entrega", texto: "Hallazgos, matriz de riesgos, plan de tratamiento, este dashboard y la exposición final." },
];

export type Activo = { tipo: string; nombre: string; valor: "Muy alto" | "Alto" | "Medio" };
export const activos: Activo[] = [
  { tipo: "D", nombre: "Credenciales de estudiantes, monitores y docentes", valor: "Muy alto" },
  { tipo: "SW", nombre: "Servicio de autenticación y gestión de usuarios", valor: "Muy alto" },
  { tipo: "SW", nombre: "Consola de gestión de cuentas y permisos", valor: "Alto" },
  { tipo: "HW", nombre: "Estaciones de trabajo (CPU y periféricos)", valor: "Alto" },
  { tipo: "P", nombre: "Monitores y administradores de las salas", valor: "Alto" },
  { tipo: "L", nombre: "Salas: puertas, cerraduras y vigilancia", valor: "Alto" },
  { tipo: "D", nombre: "Registros de inicio de sesión y de ingreso", valor: "Medio" },
];
export const tiposActivo: Record<string, string> = {
  D: "Datos",
  SW: "Software",
  HW: "Hardware",
  P: "Personal",
  L: "Instalaciones",
};

export const escala = [
  { nivel: "Inexistente", valor: 0 },
  { nivel: "Inicial", valor: 20 },
  { nivel: "Repetible", valor: 40 },
  { nivel: "Definido", valor: 60 },
  { nivel: "Gestionado", valor: 80 },
  { nivel: "Optimizado", valor: 100 },
];

export type Control = {
  id: string;
  nombre: string;
  tipo: "Lógico" | "Físico";
  valor: number;
  observacion: string;
};
export const controles: Control[] = [
  { id: "A.5.15", nombre: "Control de acceso", tipo: "Lógico", valor: 20, observacion: "No encontramos una política de control de acceso documentada y divulgada para las salas." },
  { id: "A.5.16", nombre: "Gestión de identidades", tipo: "Lógico", valor: 40, observacion: "Hay gestión de cuentas, pero siguen existiendo cuentas genéricas o compartidas por sala." },
  { id: "A.5.17", nombre: "Información de autenticación", tipo: "Lógico", valor: 20, observacion: "Contraseñas débiles o compartidas, sin requisitos mínimos." },
  { id: "A.5.18", nombre: "Derechos de acceso", tipo: "Lógico", valor: 40, observacion: "Las altas y bajas no siempre se revocan al terminar el semestre." },
  { id: "A.7.1", nombre: "Perímetros de seguridad física", tipo: "Físico", valor: 40, observacion: "Las salas tienen puerta y cerradura y el campus tiene vigilancia, pero en mayo de 2026 se sustrajeron 39 CPU de la sala 5." },
  { id: "A.7.2", nombre: "Entrada física", tipo: "Físico", valor: 40, observacion: "El ingreso lo controla un monitor o el carné en horario de clase, sin un registro consistente." },
  { id: "A.7.4", nombre: "Monitoreo de la seguridad física", tipo: "Físico", valor: 20, observacion: "No hay información pública sobre cámaras o alarmas en las salas, y la pérdida de equipos se reportó a la mañana siguiente. Se confirma en la visita." },
  { id: "A.8.2", nombre: "Derechos de acceso privilegiado", tipo: "Lógico", valor: 40, observacion: "Varias máquinas tienen cuentas de administrador local sin control estricto." },
  { id: "A.8.3", nombre: "Restricción de acceso a la información", tipo: "Lógico", valor: 60, observacion: "Existe restricción por perfil, aunque los recursos de red están poco segmentados." },
  { id: "A.8.5", nombre: "Autenticación segura", tipo: "Lógico", valor: 20, observacion: "No hay autenticación multifactor ni bloqueo por intentos fallidos." },
  { id: "A.8.15", nombre: "Registro de eventos", tipo: "Lógico", valor: 20, observacion: "No hay evidencia de un registro centralizado de inicios de sesión ni de ingresos a las salas." },
];

export type Riesgo = {
  id: string;
  activo: string;
  amenaza: string;
  p: 1 | 2 | 3;
  i: 1 | 2 | 3;
  cid: [string, string, string];
};
export const riesgos: Riesgo[] = [
  { id: "R1", activo: "Credenciales de usuarios", amenaza: "Contraseñas débiles o adivinación", p: 3, i: 3, cid: ["Alto", "Alto", "Medio"] },
  { id: "R2", activo: "Cuentas privilegiadas", amenaza: "Escalamiento de privilegios", p: 2, i: 3, cid: ["Alto", "Alto", "Medio"] },
  { id: "R3", activo: "Estaciones de trabajo", amenaza: "Acceso lógico no autorizado", p: 3, i: 3, cid: ["Alto", "Medio", "Medio"] },
  { id: "R4", activo: "Servicio de autenticación", amenaza: "Suplantación o cuentas compartidas", p: 2, i: 3, cid: ["Alto", "Alto", "Medio"] },
  { id: "R5", activo: "Derechos de acceso", amenaza: "No revocación de accesos", p: 2, i: 2, cid: ["Medio", "Medio", "Bajo"] },
  { id: "R6", activo: "Salas y equipos", amenaza: "Hurto o ingreso físico no autorizado", p: 2, i: 3, cid: ["Medio", "Bajo", "Alto"] },
  { id: "R7", activo: "Registros de acceso", amenaza: "Ausencia o pérdida de registros", p: 2, i: 2, cid: ["Bajo", "Medio", "Medio"] },
];

export type FaseJtR = { id: number; nombre: string; comando: string; duracion: string; explicacion: string };
export const fasesJtR: FaseJtR[] = [
  { id: 1, nombre: "Diccionario", comando: "john --format=crypt --wordlist=password.lst hashes.txt", duracion: "27 s", explicacion: "Prueba las 3.559 palabras más comunes del diccionario que trae John." },
  { id: 2, nombre: "Diccionario con reglas", comando: "john --format=crypt --wordlist=password.lst --rules hashes.txt", duracion: "15 min 36 s", explicacion: "Transforma cada palabra: mayúscula inicial, números al final, sustituciones." },
  { id: 3, nombre: "Incremental", comando: "timeout 300 john --format=crypt --incremental hashes.txt", duracion: "5 min", explicacion: "Fuerza bruta por combinaciones de caracteres, limitada a cinco minutos. No encontró nada nuevo." },
  { id: 4, nombre: "Lista de contexto", comando: "john --format=crypt --wordlist=contexto.txt hashes.txt", duracion: "4,4 s", explicacion: "1.034 candidatas armadas con palabras de la Universidad: Univalle, Cali, EISC, sala y número, roles, años." },
];

export type Cuenta = { usuario: string; clave: string; fase: number | null; robustez: "Crítica" | "Débil" | "Aceptable" };
export const cuentas: Cuenta[] = [
  { usuario: "auditor_debil", clave: "123456", fase: 1, robustez: "Crítica" },
  { usuario: "docente_demo", clave: "qwerty", fase: 1, robustez: "Crítica" },
  { usuario: "admin_local", clave: "admin", fase: 1, robustez: "Crítica" },
  { usuario: "auditor_media", clave: "Password1", fase: 2, robustez: "Débil" },
  { usuario: "est_sala3", clave: "Sala5cali", fase: 4, robustez: "Débil" },
  { usuario: "est_sala2", clave: "Univalle2025", fase: 4, robustez: "Débil" },
  { usuario: "monitor_sala", clave: "monitor123", fase: 4, robustez: "Débil" },
  { usuario: "est_sala1", clave: "univalle", fase: 4, robustez: "Débil" },
  { usuario: "est_frase", clave: "frase de 25 caracteres", fase: null, robustez: "Aceptable" },
  { usuario: "auditor_fuerte", clave: "13 caracteres aleatorios", fase: null, robustez: "Aceptable" },
];

export type Tecnologia = { id: string; nombre: string; como: string; ventajas: string[]; limites: string[]; costo: 1 | 2 | 3; propuesta?: string };
export const tecnologias: Tecnologia[] = [
  { id: "manual", nombre: "Registro manual", como: "Un monitor revisa el carné y anota el ingreso.", ventajas: ["Ya existe", "No cuesta nada adicional"], limites: ["Depende de la persona", "Fuera de horario no queda registro"], costo: 1 },
  { id: "qr", nombre: "Carné con QR", como: "Un lector en la puerta lee el código del carné institucional.", ventajas: ["Usa una credencial que todos tienen", "Bajo costo"], limites: ["El código se puede fotografiar o copiar"], costo: 1, propuesta: "Fase 1" },
  { id: "nfc", nombre: "Tarjeta RFID o NFC", como: "El lector detecta la tarjeta por proximidad y guarda fecha y hora.", ventajas: ["Rápido", "Registro automático de cada ingreso"], limites: ["Hay que emitir tarjetas compatibles", "Una tarjeta prestada da acceso a otra persona"], costo: 2, propuesta: "Fase 1" },
  { id: "huella", nombre: "Huella dactilar", como: "Un lector biométrico compara la huella con la registrada.", ventajas: ["Liga el ingreso a la persona", "Evita prestar credenciales"], limites: ["Dato sensible (Ley 1581 de 2012): requiere autorización expresa", "Mayor costo"], costo: 3, propuesta: "Fase 2" },
  { id: "facial", nombre: "Reconocimiento facial", como: "Una cámara identifica el rostro de quien entra.", ventajas: ["No requiere contacto"], limites: ["Dato sensible", "Falla con mala luz o ángulos", "Manejo de imágenes"], costo: 3 },
];

export type Accion = { control: string; accion: string; responsable: string; inicio: number; fin: number; compra: boolean };
export const plan: Accion[] = [
  { control: "A.5.15", accion: "Redactar y divulgar la política de control de acceso de las salas", responsable: "Dirección EISC y TI", inicio: 0, fin: 1, compra: false },
  { control: "A.5.17 · A.8.5", accion: "Política de contraseñas (15+ caracteres, frases de paso, bloquear palabras del entorno), bloqueo por intentos y MFA para administradores", responsable: "Admin. TI EISC", inicio: 0, fin: 2, compra: false },
  { control: "A.5.16", accion: "Una cuenta por usuario y eliminar las genéricas", responsable: "Admin. TI EISC", inicio: 1, fin: 2, compra: false },
  { control: "A.8.2", accion: "Mínimo privilegio y restricción de cuentas de administrador", responsable: "Admin. TI EISC", inicio: 1, fin: 3, compra: false },
  { control: "A.7.2", accion: "Lector de carné (QR o NFC) con registro electrónico de ingreso", responsable: "Coordinación de salas", inicio: 2, fin: 3, compra: true },
  { control: "A.7.1 · A.7.4", accion: "Cámaras en los accesos y alarma de apertura fuera de horario", responsable: "Sección de seguridad y EISC", inicio: 2, fin: 4, compra: true },
  { control: "A.8.15", accion: "Registro central de ingresos y sesiones, revisado cada semana", responsable: "Admin. TI EISC", inicio: 3, fin: 5, compra: true },
  { control: "A.5.18", accion: "Baja de cuentas al cierre de cada semestre y revisión de privilegios", responsable: "Coordinación y monitores", inicio: 5, fin: 6, compra: false },
];

export const referencias = [
  { cita: "Becerra, A. (2026, 4 de mayo). Reportan desaparición de computadores en la Universidad del Valle. El País.", url: "https://www.elpais.com.co/cali/reportan-desaparicion-de-computadores-en-la-universidad-del-valle-esto-fue-lo-que-ocurrio-0450.html" },
  { cita: "ISO. (2022). ISO/IEC 27001:2022. Sistemas de gestión de la seguridad de la información. Requisitos.", url: "https://www.iso.org/standard/27001" },
  { cita: "MinTIC. (2017). Instructivo de la herramienta de diagnóstico de seguridad y privacidad de la información (MSPI).", url: "https://gobiernodigital.mintic.gov.co/692/articles-5482_Instructivo_instrumento_Evaluacion_MSPI.pdf" },
  { cita: "Temoshok, D. et al. (2025). NIST SP 800-63B-4. Digital identity guidelines: Authentication and authenticator management.", url: "https://doi.org/10.6028/NIST.SP.800-63b-4" },
  { cita: "Tumalie Guzmán, K. S. y Martínez Zambrano, J. S. (2026). Implementación de tecnología RFID e IoT para la trazabilidad de accesos en entornos académicos. UPS.", url: "https://dspace.ups.edu.ec/bitstream/123456789/34448/1/UPS-GT007689.pdf" },
  { cita: "Universidad Militar Nueva Granada. (2024). Informe de auditoría de control interno: Gestión estratégica TIC.", url: "https://umng.edu.co/wp-content/uploads/2026/04/5.-Informe-Ejecutivo-Final-Auditoria_OFITIC_2024.pdf" },
  { cita: "Verizon. (2025). 2025 Data breach investigations report.", url: "https://www.verizon.com/business/resources/reports/dbir/" },
  { cita: "Openwall. (s.f.). John the Ripper password cracker.", url: "https://www.openwall.com/john/" },
];
