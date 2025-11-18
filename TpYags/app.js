//Ejercicio 1 — Uso básico de Yargs
// Ejercicio 1 y 2 — Uso básico de Yargs + Validación de argumentos
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("nombre", {
    type: "string",
    demandOption: true, // 🔸 el nombre es obligatorio
    describe: "Nombre del usuario",
  })
  .option("edad", {
    type: "number",
    demandOption: true, // 🔸 la edad también es obligatoria
    describe: "Edad del usuario",
  })
  .check((argv) => {
    if (argv.edad < 0) {
      throw new Error(" La edad no puede ser negativa.");
    }
    if (!argv.nombre.trim()) {
      throw new Error(" El nombre no puede estar vacío.");
    }
    return true; // validación correcta
  })
  .argv;

console.log(`Hola ${argv.nombre}, tenés ${argv.edad} años.`);
