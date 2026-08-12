/* ===== Utilidades compartidas ===== */
window.APP = {
  DURACION_MIN: 60,          // Simulacro proyectado a 1 hora
  NUM_PREGUNTAS: 50,         // Preguntas por simulacro (aleatorias)
  KEY_SESION: "sp_sesion_actual",
  KEY_RESULTADOS: "sp_resultados",

  // ---- storage ----
  getSesion(){ try{ return JSON.parse(localStorage.getItem(this.KEY_SESION)||"null"); }catch(e){ return null; } },
  setSesion(o){ localStorage.setItem(this.KEY_SESION, JSON.stringify(o)); },
  clearSesion(){ localStorage.removeItem(this.KEY_SESION); },
  getResultados(){ try{ return JSON.parse(localStorage.getItem(this.KEY_RESULTADOS)||"[]"); }catch(e){ return []; } },
  addResultado(r){ const a=this.getResultados(); a.push(r); localStorage.setItem(this.KEY_RESULTADOS, JSON.stringify(a)); },
  clearResultados(){ localStorage.removeItem(this.KEY_RESULTADOS); },

  // ---- helpers ----
  fmtTime(seg){ seg=Math.max(0,Math.floor(seg)); const m=String(Math.floor(seg/60)).padStart(2,"0"); const s=String(seg%60).padStart(2,"0"); return m+":"+s; },
  shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; },
  escape(t){ return String(t==null?"":t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); },
  uid(){ return "S"+Date.now().toString(36)+Math.random().toString(36).slice(2,6); },

  // ---- selección balanceada de preguntas por módulo ----
  seleccionarPreguntas(n){
    const banco = window.BANCO_PREGUNTAS || [];
    if(n > banco.length) n = banco.length;
    const modulos = [...new Set(banco.map(q=>q.modulo))];
    const porMod = {}; modulos.forEach(m=> porMod[m]=this.shuffle(banco.filter(q=>q.modulo===m)));
    const base = Math.floor(n/modulos.length);
    let sel=[];
    modulos.forEach(m=> sel = sel.concat(porMod[m].slice(0, base)));
    // completar hasta n con el resto aleatorio
    let resto = this.shuffle(banco.filter(q=> !sel.includes(q)));
    let i=0;
    while(sel.length<n && i<resto.length){ sel.push(resto[i++]); }
    return this.shuffle(sel).slice(0,n);
  }
};
