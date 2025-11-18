//punto6
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";

import {
  suma,
  resta,
  multiplicacion,
  division
} from "./math.js";

const argv = yargs(hideBin(process.argv))
  .command("saludar", "Saluda a una persona", {
    nombre: {
      alias: "n",
      demandOption: true,
      type: "string",
      describe: "Nombre de la persona"
    },
  }, (args) => {
    console.log(`¡Hola ${args.nombre}!`);
  })
  .command("despedir", "Despide a una persona", {
    nombre: {
      alias: "n",
      demandOption: true,
      type: "string",
      describe: "Nombre de la persona"
    },
  }, (args) => {
    console.log(`Adiós ${args.nombre}!`);
  })
  .command("calcular", "Realiza operaciones matemáticas", {
    operacion: {
      alias: "o",
      demandOption: true,
      type: "string",
      describe: "Operación matemática",
      choices: ["suma", "resta", "multiplicacion", "division"]
    },
    n1: {
      demandOption: true,
      type: "number",
    },
    n2: {
      demandOption: true,
      type: "number",
    },
  }, (args) => {
    try {
      let resultado;

      switch (args.operacion) {
        case "suma":
          resultado = suma(args.n1, args.n2);
          break;
        case "resta":
          resultado = resta(args.n1, args.n2);
          break;
        case "multiplicacion":
          resultado = multiplicacion(args.n1, args.n2);
          break;
        case "division":
          resultado = division(args.n1, args.n2);
          break;
        default:
          throw new Error("Operación no válida");
      }

      console.log(`Resultado: ${resultado}`);
    } catch (err) {
      console.error(` Error: ${err.message}`);
    }
  })
  .command("leer-json", "Lee un archivo JSON", {
    archivo: {
      alias: "a",
      demandOption: true,
      type: "string",
      describe: "Ruta del archivo JSON"
    }
  }, (args) => {
    try {
      if (!fs.existsSync(args.archivo)) {
        throw new Error("El archivo no existe");
      }
      const contenido = JSON.parse(fs.readFileSync(args.archivo, "utf-8"));
      console.log(contenido);
    } catch (err) {
      console.error(` Error al leer JSON: ${err.message}`);
    }
  })
  .help()
  .demandCommand(1, "Debes ejecutar al menos un comando")
  .argv;
