const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  student_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante' }]
});

module.exports = mongoose.model('Curso', CursoSchema);
