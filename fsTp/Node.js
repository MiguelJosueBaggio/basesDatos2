 const fs = require("fs");

 
const data = fs.readFileSync("contactos.json","utf-8");

const json_data = JSON.parse(data);
 
const nuevo = {nombre:"Miguel",telefono:"0303456",email:"migue@gmail.com"};

json_data.push(nuevo);
const nuevoContenido = JSON.stringify(json_data,null,2);

fs.writeFileSync("contactos.json", nuevoContenido, "utf-8");

console.log(" JSON agregado correctamente.");




fs.readFile("contactos.json", "utf-8", (err, data) => {
  if (err) return console.error("Error leyendo el archivo:", err);

  const json_data = JSON.parse(data);
  console.log(json_data);
});


const usuarios_eliminados= json_data.filter( )