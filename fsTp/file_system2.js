const fs = require("fs");
const ahora = new Date();

fs.writeFile("datos.txt","Nombre:[Miguel]\nEdad:39\nCarrera:Programacion",(err)=>{
   if (err) return console.error("Error escribiendo:", err);
  console.log("Archivo escrito (async)");  
});

fs.readFile("datos.txt", "utf8", (err, data) => {
  if (err) return console.error("Error leyendo:", err);
  console.log("Contenido (async):", data);
});


fs.appendFile("datos.txt", "\n"+ahora, (err) => {
  if (err) return console.error("Error agregando:", err);
  console.log("Texto agregado (async)");
});



fs.rename("datos.txt", "informacion.txt", (err) => {
  if (err) return console.error("Error al renombrar:", err);
  console.log("Archivo renombrado correctamente.");
});

setTimeout(() => {
  console.log("Tarea terminada"+ ahora);
}, 5000); // 3000 milisegundos = 3 segundos


fs.unlink("informacion.txt", (err) => {
  if (err) return console.error("Error borrando:", err);
  setTimeout(() => {
  console.log("Archivo eliminado");
}, 10000); // 10000 milisegundos = 3 segundos

});
