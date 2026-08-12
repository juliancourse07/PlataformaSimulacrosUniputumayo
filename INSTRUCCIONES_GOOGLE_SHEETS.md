# 🗄️ Conectar la plataforma a Google Sheets (base de datos gratis)

Con esto, **cada simulacro de cualquier estudiante (desde cualquier equipo) se guardará
en tu Google Sheet** y el **dashboard mostrará los resultados de todos a cualquiera**.
Todo es **100% gratuito**. Tiempo estimado: **10 minutos**.

---

## PARTE 1 · Crear la hoja y el backend (Apps Script)

### Paso 1 — Crea la hoja
1. Entra a **https://sheets.google.com** con tu cuenta de Google.
2. Crea una **hoja de cálculo en blanco**.
3. Ponle un nombre, por ejemplo: **Simulacros Uniputumayo**.

### Paso 2 — Abre el editor de Apps Script
1. En la hoja, menú **Extensiones → Apps Script**.
2. Se abre una pestaña nueva con un archivo llamado `Código.gs` que trae algo como
   `function myFunction() { }`.
3. **Borra todo** lo que haya en ese archivo.

### Paso 3 — Pega el código
1. Abre el archivo **`google-apps-script/Codigo.gs`** (viene en el ZIP de la plataforma).
2. **Copia TODO** su contenido y **pégalo** en el editor de Apps Script.
3. Haz clic en el ícono de **guardar** 💾 (o Ctrl+S).

### Paso 4 — Implementa como Aplicación web
1. Arriba a la derecha, clic en **Implementar → Nueva implementación**.
2. Junto a "Seleccionar tipo" (ícono de engranaje ⚙️), elige **Aplicación web**.
3. Configura así:
   - **Descripción:** `API Simulacros` (opcional).
   - **Ejecutar como:** **Yo** (tu correo).
   - **Quién tiene acceso:** **Cualquier usuario**. ⬅️ *muy importante*
4. Clic en **Implementar**.
5. Google pedirá **autorizar permisos**:
   - Clic en **Autorizar acceso** → elige tu cuenta.
   - Si aparece "Google no ha verificado esta app": clic en **Configuración avanzada →
     Ir a (nombre del proyecto) (no seguro)** → **Permitir**. (Es tu propio proyecto, es seguro.)
6. Al terminar, copia la **URL de la aplicación web** (termina en **`/exec`**).
   Ejemplo: `https://script.google.com/macros/s/AKfy...aBc/exec`

> 💡 Guarda esa URL: es la que conecta tu plataforma con la hoja.

---

## PARTE 2 · Conectar la plataforma

### Paso 5 — Pega la URL en la configuración
1. Abre el archivo **`assets/js/config.js`** de la plataforma.
2. Pega tu URL entre las comillas de `API_URL`:
   ```js
   window.CONFIG = {
     API_URL: "https://script.google.com/macros/s/AKfy...aBc/exec"
   };
   ```
3. Guarda el archivo.

### Paso 6 — Sube los cambios a GitHub
1. En tu repositorio: **Add file → Upload files**.
2. Sube **toda la carpeta actualizada** (o al menos los archivos nuevos/editados):
   - `assets/js/config.js`  ← con tu URL
   - `assets/js/api.js`
   - `index.html`, `simulacro.html`, `dashboard.html`
3. **Commit changes**. Espera 1–2 min y abre tu sitio con **Ctrl+F5**.

---

## PARTE 3 · Probar que quedó bien
1. Entra a tu plataforma y **haz un simulacro completo**.
2. Abre tu **Google Sheet**: debe aparecer una nueva hoja llamada **`Resultados`**
   con una fila con los datos del estudiante. ✅
3. Abre el **Dashboard**: arriba debe decir **☁️ "Datos en la nube (Google Sheets)"**
   y mostrar el resultado. Pídele a alguien más que lo haga desde otro equipo:
   también aparecerá. 🎉

---

## ❓ Preguntas frecuentes

**¿Cuántos estudiantes pueden entrar a la vez?**
Miles pueden presentar el simulacro al tiempo (el sitio es estático y muy liviano).
Google Apps Script gratuito permite un uso alto para una institución; si algún
resultado no alcanzara a guardarse en la nube, **queda el respaldo local** y no se pierde
la experiencia del estudiante.

**¿Los datos quedan guardados de forma permanente?**
Sí. Una vez en tu Google Sheet, quedan guardados en tu Google Drive (puedes descargarlos
en Excel/CSV cuando quieras).

**¿Es seguro poner "Cualquier usuario"?**
Sí para este uso: solo permite **enviar un resultado** o **leer la lista** mediante el
script; nadie accede a tu cuenta. Si más adelante quieres restringir, se puede añadir una
clave secreta.

**Si actualizo el banco de preguntas o el diseño, ¿pierdo los datos?**
No. Los datos viven en la Google Sheet, independiente del sitio.

---
Institución Universitaria del Putumayo · UNIPUTUMAYO · Sistema de Fortalecimiento Saber Pro / Saber TyT.
