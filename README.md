# Plataforma de Simulacros Saber Pro / Saber TyT — UNIPUTUMAYO

Aplicación **web estática y 100% gratuita** para realizar simulacros tipo Saber Pro / Saber TyT,
calificarlos automáticamente y visualizar resultados en un **dashboard institucional**.
No requiere servidor ni base de datos: funciona en el navegador con `localStorage`,
por lo que se publica gratis en **GitHub Pages**.

Identidad visual: **Institución Universitaria del Putumayo (UNIPUTUMAYO)** — colores azul `#09618F`,
verde `#7CB532` y sol `#E8873A`.

## ✨ Características
- **Registro** con validación: solo *Nombre* y *Documento* son campos abiertos; el resto son listas desplegables (programa, sede, edad, género, jornada, semestre, modalidad). Sedes: Mocoa, Sibundoy, Valle del Guamuez, Puerto Asís, Otras.
- **Simulador (60 minutos · 50 preguntas)**: cronómetro con alertas, navegador de preguntas, *marcar para revisión*, indicador de avance, **preguntas aleatorias** balanceadas por módulo, **bloqueo y entrega automática** al agotarse el tiempo.
- **Resultados inmediatos**: puntaje global, por módulo, nivel de desempeño, recomendaciones y **revisión con explicación**.
- **Dashboard institucional**: participación por sede/programa, niveles (donut), ranking de competencias (radar), tabla por sede, fortalezas/brechas y **exportación a CSV**.
- **Banco de preguntas** con 5 módulos genéricos (65 ítems), cada uno con competencia, dificultad, tiempo y explicación.

## 📁 Estructura
```
index.html · simulacro.html · resultados.html · dashboard.html
assets/css/styles.css
assets/js/preguntas.js · assets/js/app.js
assets/img/logo.png · assets/img/favicon.png
.github/workflows/deploy.yml
```

## 🔄 Actualizar el sitio ya publicado (subir cambios)
1. En tu repositorio de GitHub, entra a **Add file → Upload files**.
2. Arrastra los archivos/carpetas modificados (respeta las rutas: `assets/img/logo.png`, etc.).
   Si subes un archivo con el mismo nombre y ruta, **GitHub lo sobrescribe**.
3. Baja y haz clic en **Commit changes**.
4. GitHub Pages se actualiza solo en 1–2 minutos. Recarga tu sitio con Ctrl+F5.

## 🚀 Desplegar por primera vez en GitHub Pages
1. Crea un repositorio **público** y sube todo el contenido (que `index.html` quede en la raíz).
2. **Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save**.
3. Tu sitio quedará en `https://TU-USUARIO.github.io/TU-REPO/`.

## 🔧 Personalización
- **Duración y nº de preguntas**: `APP.DURACION_MIN` y `APP.NUM_PREGUNTAS` en `assets/js/app.js`.
- **Banco de preguntas**: `window.BANCO_PREGUNTAS` en `assets/js/preguntas.js`.
- **Programas y sedes**: `window.CATALOGOS` en `assets/js/preguntas.js`.
- **Logo**: reemplaza `assets/img/logo.png` por el logo oficial que prefieras.

## ☁️ Modo nube (Google Sheets) — resultados de TODOS
La plataforma puede guardar los resultados en una **Google Sheet** gratuita para que el
dashboard muestre a **todos** los estudiantes desde **cualquier equipo**.
- Guía paso a paso: **`INSTRUCCIONES_GOOGLE_SHEETS.md`**
- Backend (para pegar en Apps Script): **`google-apps-script/Codigo.gs`**
- Solo debes pegar tu URL en **`assets/js/config.js`** (`API_URL`).

Si `API_URL` queda vacío, la plataforma funciona en **modo local** (localStorage): cada
navegador guarda sus propios datos.

## 🔒 Datos y privacidad
En **modo local**, los resultados se guardan solo en el navegador del equipo. En **modo nube**,
quedan en tu Google Sheet (tu Google Drive), descargables a Excel/CSV cuando quieras. La app
siempre mantiene un respaldo local para no perder resultados si la red falla.

---
Institución Universitaria del Putumayo · UNIPUTUMAYO · Sistema de Fortalecimiento Saber Pro / Saber TyT.
