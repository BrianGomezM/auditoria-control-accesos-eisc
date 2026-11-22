# Auditoría de control de accesos · Salas de cómputo EISC

Dashboard estático con los resultados de la auditoría de seguridad de la información en las salas de cómputo de la Escuela de Ingeniería de Sistemas y Computación (Universidad del Valle), con énfasis en el control de accesos según ISO/IEC 27001:2022.

Curso Ciberseguridad (750024 C), grupo 3743. Docente: Mgs. Claudia Ximena Muñoz Ausecha.

## Qué muestra

- Contexto: el hurto de 39 CPU de la sala 5 (mayo de 2026) y el peso de las credenciales en las brechas.
- Alcance, fases de la auditoría y activos revisados (MAGERIT).
- Nivel de madurez de los 11 controles de acceso con la escala del MSPI de MinTIC.
- Matriz de calor de riesgos (probabilidad por impacto).
- La prueba con John the Ripper sobre 10 cuentas ficticias, fase por fase, y un verificador de contraseñas con la política propuesta. El verificador funciona solo en el navegador.
- La propuesta de control de accesos (carné QR o NFC, cámara, cuentas individuales, registro central) con dos escenarios.
- Plan de tratamiento a seis meses.

El informe completo está en `public/informe.pdf`.

## Tecnologías

React 18, TypeScript, Vite 5, Tailwind CSS 3 y Framer Motion.

## Correr en local

```bash
npm install
npm run dev
```

## Publicar

`npm run build` genera la carpeta `dist/` con rutas relativas, así que sirve para GitHub Pages, Netlify o Render como sitio estático.

## Equipo

Néstor David Heredia Gutiérrez, Miguel Ángel Moreno Romero, Juan José Moreno Jaramillo, Héctor Luis Díaz Hurtado, Brayan Julio Gómez Muñoz y Juan Pablo Charry Ramírez.

La página no contiene datos reales de usuarios ni credenciales de la Universidad.
