const express = require('express');
const app = express();
const PORT = 3000;

/* =
   MIDDLEWARE GLOBAL: Contar peticiones
 */
let contador = 0;

const contarPeticiones = (req, res, next) => {
  contador++;
  console.log(`Peticiones hasta ahora: ${contador}`);
  next();
};

app.use(contarPeticiones);

/* ============================================
   MIDDLEWARE: Registrar info de cada petición
============================================ */
app.use((req, res, next) => {
  console.log("----- Registro de petición -----");
  console.log("Fecha:", new Date());
  console.log("Método:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("IP:", req.ip);
  console.log("--------------------------------");
  next();
});

/* ============================================
   MIDDLEWARE LOCAL: Validar Edad
============================================ */
const validarEdad = (req, res, next) => {
  const edad = Number(req.query.edad);

  if (!edad || isNaN(edad) || edad < 18) {
    return res.status(400).send("Acceso denegado");
  }

  next();
};

/* ============================================
   Rutas del ejercicio
============================================ */

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del TP N°2');
});

// Ruta con middleware de edad
app.get('/edad', validarEdad, (req, res) => {
  res.send("Acceso permitido");
});

// Ruta producto por ID
app.get('/producto/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send("El ID debe ser un número");
  }

  res.send(`Producto con ID: ${id}`);
});

// Ruta promedio
app.get('/promedio', (req, res) => {
  const { n1, n2, n3 } = req.query;

  if (!n1 || !n2 || !n3) {
    return res.status(400).send("Faltan parámetros");
  }

  const num1 = Number(n1);
  const num2 = Number(n2);
  const num3 = Number(n3);

  if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
    return res.status(400).send("Las notas deben ser números");
  }

  const promedio = (num1 + num2 + num3) / 3;
  res.send(`El promedio es: ${promedio}`);
});

// Ruta fecha
app.get('/fecha', (req, res) => {
  res.send(`Fecha actual: ${new Date().toLocaleString()}`);
});

// Ruta hora
app.get('/hora', (req, res) => {
  res.send(`Hora actual del servidor: ${new Date().toLocaleTimeString()}`);
});

/* ============================================
   Iniciar servidor
============================================ */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
