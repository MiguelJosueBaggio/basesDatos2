
require('dotenv').config();
const mongoose = require('mongoose');
const Autor = require('./models/Autor');
const Libro = require('./models/Libro');
const Estudiante = require('./models/Estudiante');
const Curso = require('./models/Curso');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/practico_mongodb';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Conectado a MongoDB para seed');

  // Limpiar colecciones
  await Autor.deleteMany({});
  await Libro.deleteMany({});
  await Estudiante.deleteMany({});
  await Curso.deleteMany({});

  // Autores
  const [gabo, borges, cortazar] = await Autor.insertMany([
    { nombre: 'Gabriel García Márquez', fecha_nacimiento: 1927 },
    { nombre: 'Jorge Luis Borges', fecha_nacimiento: 1899 },
    { nombre: 'Julio Cortázar', fecha_nacimiento: 1914 }
  ]);

  // Libros
  await Libro.insertMany([
    { titulo: 'Cien años de soledad', paginas: 417, categorias: ['Realismo mágico'], autor_id: gabo._id },
    { titulo: 'El coronel no tiene quien le escriba', paginas: 112, categorias: ['Drama'], autor_id: gabo._id },
    { titulo: 'El Aleph', paginas: 157, categorias: ['Ficción'], autor_id: borges._id },
    { titulo: 'Ficciones', paginas: 200, categorias: ['Cuentos'], autor_id: borges._id },
    { titulo: 'Rayuela', paginas: 600, categorias: ['Novela'], autor_id: cortazar._id }
  ]);

  // Estudiantes
  const [ana, luis, carla, miguel] = await Estudiante.insertMany([
    { nombre: 'Ana', email: 'ana@mail.com', edad: 22 },
    { nombre: 'Luis', email: 'luis@mail.com', edad: 28 },
    { nombre: 'Carla', email: 'carla@mail.com', edad: 25 },
    { nombre: 'Miguel', email: 'miguel@mail.com', edad: 30 }
  ]);

  // Cursos
  const [mongodb, nodejs, react] = await Curso.insertMany([
    { titulo: 'MongoDB', descripcion: 'NoSQL', student_ids: [ana._id, luis._id] },
    { titulo: 'Node.js', descripcion: 'Backend', student_ids: [luis._id, carla._id] },
    { titulo: 'React', descripcion: 'Frontend', student_ids: [ana._id, carla._id, miguel._id] }
  ]);

  // Agregar curso a estudiantes
  await Estudiante.updateOne({ _id: ana._id }, { $set: { cursos: [mongodb._id, react._id] } });
  await Estudiante.updateOne({ _id: luis._id }, { $set: { cursos: [mongodb._id, nodejs._id] } });
  await Estudiante.updateOne({ _id: carla._id }, { $set: { cursos: [nodejs._id, react._id] } });
  await Estudiante.updateOne({ _id: miguel._id }, { $set: { cursos: [react._id] } });

  console.log('Seed completado');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
