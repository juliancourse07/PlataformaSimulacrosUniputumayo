/* =====================================================================
   CAPA DE DATOS — Conexión con Google Sheets (Apps Script)
   ---------------------------------------------------------------------
   - Si CONFIG.API_URL está configurada: guarda/lee en la nube.
   - Siempre mantiene una copia local (localStorage) como respaldo.
   ===================================================================== */
window.API = {
  get url(){ return ((window.CONFIG && window.CONFIG.API_URL) || "").trim(); },
  enabled(){ return /^https?:\/\//.test(this.url); },

  /* Guardar un resultado. Cachea localmente SIEMPRE y, si hay URL,
     lo envía a Google Sheets (fire-and-forget, sin bloquear al usuario). */
  async guardarResultado(r){
    try{ APP.addResultado(r); }catch(e){}                 // respaldo local
    try{ localStorage.setItem("sp_ultimo_resultado", JSON.stringify(r)); }catch(e){}
    if(!this.enabled()) return { ok:true, local:true };
    try{
      // 'no-cors' + cuerpo de texto = solicitud simple: llega y escribe la fila.
      await fetch(this.url, {
        method:"POST",
        mode:"no-cors",
        headers:{ "Content-Type":"text/plain;charset=utf-8" },
        body: JSON.stringify(r)
      });
      return { ok:true };
    }catch(e){
      return { ok:false, error:String(e) };               // ya quedó en local
    }
  },

  /* Listar TODOS los resultados. Si hay URL, lee de Google Sheets;
     si falla o no hay URL, usa el respaldo local. */
  async listarResultados(){
    if(this.enabled()){
      try{
        const sep = this.url.includes("?") ? "&" : "?";
        const res = await fetch(this.url + sep + "action=list&_=" + Date.now(), { method:"GET" });
        const data = await res.json();
        if(data && data.ok && Array.isArray(data.results)) return data.results;
      }catch(e){ /* cae al respaldo local */ }
    }
    return APP.getResultados();
  }
};
