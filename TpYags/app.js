import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import config from "./config.js"; // <- IMPORTANTE

const argv = yargs(hideBin(process.argv))
  .option("nombre", {
    type: "string",
    demandOption: true,
    describe: "Nombre del usuario",
  })
  .option("edad", {
    type: "number",
    demandOption: true,
    describe: "Edad del usuario",
  })
  .option("saludo", {
    type: "string",
    default: "Hola",
    describe: "Mensaje de saludo",
  })
  .check((argv) => {
    if (argv.edad < 0) throw new Error(" La edad no puede ser negativa.");
    if (!argv.nombre.trim()) throw new Error(" El nombre no puede estar vacío.");
    return true;
  })
  .argv;

// Ejercicio 1 y 2
console.log(`Hola ${argv.nombre}, tenés ${argv.edad} años.`);

// Ejercicio 5
console.log(
  `Servidor corriendo en el puerto ${config.port} (modo ${config.mode}): ${argv.saludo} ${argv.nombre}!`
);
