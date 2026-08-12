/* =====================================================================
   BACKEND GRATUITO — Google Apps Script + Google Sheets
   Plataforma de Simulacros Saber Pro / TyT — UNIPUTUMAYO
   ===================================================================== */
var SHEET_NAME = 'Resultados';
var HEADERS = ['id','fecha','nombre','documento','programa','sede','edad',
  'genero','jornada','semestre','modalidad','global','correctas',
  'totalPreguntas','duracionSeg','porTiempo','porModulo_json','detalle_json'];

function doGet(e){
  try{
    var action = (e && e.parameter && e.parameter.action) || 'list';
    if(action === 'list'){ return json({ ok:true, results: getAll() }); }
    return json({ ok:true, results: [] });
  }catch(err){ return json({ ok:false, error: String(err) }); }
}

function doPost(e){
  try{
    var r = JSON.parse(e.postData.contents);
    appendResult(r);
    return json({ ok:true });
  }catch(err){ return json({ ok:false, error: String(err) }); }
}

function json(obj){
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if(!sh){
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.getRange(1,1,1,HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function appendResult(r){
  var sh = getSheet();
  var e = r.estudiante || {};
  sh.appendRow([
    r.id || '', r.fecha || new Date().toISOString(),
    e.nombre || '', "'" + (e.documento || ''),
    e.programa || '', e.sede || '', e.edad || '', e.genero || '',
    e.jornada || '', e.semestre || '', e.modalidad || '',
    Number(r.global || 0), Number(r.correctas || 0),
    Number(r.totalPreguntas || 0), Number(r.duracionSeg || 0),
    r.porTiempo ? 'SI' : 'NO',
    JSON.stringify(r.porModulo || {}), JSON.stringify(r.detalle || [])
  ]);
}

function getAll(){
  var sh = getSheet();
  var values = sh.getDataRange().getValues();
  if(values.length < 2) return [];
  var out = [];
  for(var i=1; i<values.length; i++){
    var row = values[i];
    out.push({
      id: row[0], fecha: row[1],
      estudiante: {
        nombre: row[2], documento: String(row[3]).replace(/^'/, ''),
        programa: row[4], sede: row[5], edad: row[6], genero: row[7],
        jornada: row[8], semestre: row[9], modalidad: row[10]
      },
      global: Number(row[11]), correctas: Number(row[12]),
      totalPreguntas: Number(row[13]), duracionSeg: Number(row[14]),
      porTiempo: (row[15] === 'SI'),
      porModulo: safeParse(row[16], {}), detalle: safeParse(row[17], [])
    });
  }
  return out;
}

function safeParse(s, def){ try{ return JSON.parse(s); }catch(e){ return def; } }
