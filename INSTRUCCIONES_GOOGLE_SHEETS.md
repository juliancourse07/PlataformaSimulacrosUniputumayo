# Conectar la plataforma a Google Sheets (base de datos gratis)

La URL ya viene configurada en assets/js/config.js. Si necesitas rehacerlo:

1. Crea una Google Sheet.
2. Extensiones → Apps Script. Borra todo y pega google-apps-script/Codigo.gs.
3. Implementar → Nueva implementación → Aplicación web:
   - Ejecutar como: Yo
   - Quién tiene acceso: Cualquier usuario
4. Copia la URL (/exec) y pégala en assets/js/config.js (API_URL).
5. Sube los archivos a GitHub. El dashboard mostrará ☁️ "Datos en la nube".

Prueba: abre TU_URL/exec?action=list → debe responder {"ok":true,"results":[]}.
