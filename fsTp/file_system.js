const fs = require("fs");
const ahora = new Date();


fs.writeFile("log.txt",`la fecha y hora exacta es ${ahora}`,(err)=>{
if (err) return console.error("Error agregando:", err);
setTimeout(() => {
  console.log("Tarea terminada"+ ahora);
}, 5000); // 3000 milisegundos = 3 segundos

  console.log("ejecutando tarea " + ahora);

})

