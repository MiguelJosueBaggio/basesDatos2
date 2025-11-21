require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/practico_mongodb';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

/* Models */
const Autor = require('./models/Autor');
const Libro = require('./models/Libro');
const Estudiante = require('./models/Estudiante');
const Curso = require('./models/Curso');

/* Routes */
const autoresRouter = require('./routes/autores');
const librosRouter = require('./routes/libros');
const estudiantesRouter = require('./routes/estudiantes');
const cursosRouter = require('./routes/cursos');

app.use('/api/autores', autoresRouter);
app.use('/api/libros', librosRouter);
app.use('/api/estudiantes', estudiantesRouter);
app.use('/api/cursos', cursosRouter);

app.get('/', (req,res) => {
  res.send('API Practico MongoDB - Node + Express + Mongoose');
});

app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});
