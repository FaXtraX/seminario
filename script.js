const clave="mendozaReporta";

function mostrarSeccion(id){
  document.querySelectorAll(".seccion").forEach(s=>s.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
  if(id==="reportes") cargarReportes();
  window.scrollTo({top:0,behavior:"smooth"});
}

document.getElementById("reporteForm").addEventListener("submit", function(e){
  e.preventDefault();
  const reporte={
    id:Date.now(),
    tipo:document.getElementById("tipo").value,
    zona:document.getElementById("zona").value.trim(),
    descripcion:document.getElementById("descripcion").value.trim(),
    prioridad:document.getElementById("prioridad").value,
    fecha:new Date().toLocaleString("es-AR")
  };
  const reportes=JSON.parse(localStorage.getItem(clave)||"[]");
  reportes.push(reporte);
  localStorage.setItem(clave,JSON.stringify(reportes));
  this.reset();
  const m=document.getElementById("mensaje");
  m.textContent="✓ Reporte registrado correctamente.";
  m.style.color="#26733d";
  setTimeout(()=>m.textContent="",3000);
});

function cargarReportes(){
  const cont=document.getElementById("listaReportes");
  const reportes=JSON.parse(localStorage.getItem(clave)||"[]");
  if(!reportes.length){
    cont.innerHTML='<div class="vacio">Todavía no hay reportes registrados.</div>';
    return;
  }
  cont.innerHTML=reportes.slice().reverse().map(r=>`
    <article class="reporte">
      <h3>${escapeHTML(r.tipo)}</h3>
      <span class="etiqueta ${r.prioridad.toLowerCase()}">${escapeHTML(r.prioridad)}</span>
      <span class="etiqueta">${escapeHTML(r.fecha)}</span>
      <p><strong>Zona:</strong> ${escapeHTML(r.zona)}</p>
      <p><strong>Descripción:</strong> ${escapeHTML(r.descripcion)}</p>
    </article>`).join("");
}

function borrarTodos(){
  if(confirm("¿Querés borrar todos los reportes guardados?")){
    localStorage.removeItem(clave);
    cargarReportes();
  }
}

function escapeHTML(text){
  return text.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
cargarReportes();
