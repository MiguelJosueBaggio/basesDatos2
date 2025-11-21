const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  edad: Number,
  cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }]
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);
