const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');
const Estudiante = require('../models/Estudiante');

// Creamos curso
router.post('/', async (req, res) => {
  try {
    const curso = new Curso(req.body);
    await curso.save();
    res.status(201).json(curso);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Obtenemos los nombres de los estudianyes
router.get('/', async (req, res) => {
  const cursos = await Curso.aggregate([
    { $lookup: { from: 'estudiantes', localField: 'student_ids', foreignField: '_id', as: 'estudiantes' } },
    { $project: { titulo:1, descripcion:1, estudiantes: '$estudiantes.nombre' } }
  ]);
  res.json(cursos);
});

// borramos cursos de estudiantes 
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Curso.findByIdAndDelete(id);
    await Estudiante.updateMany({}, { $pull: { cursos: id }, $pullAll: {} });
    await Estudiante.updateMany({}, { $pull: { cursos: id } });
    res.json({ message: 'Curso eliminado y referencias removidas' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Agregaciones: contar estudiantes por curso
router.get('/aggs/cantidad-estudiantes', async (req, res) => {
  const result = await Curso.aggregate([
    { $project: { titulo:1, cantidad_estudiantes: { $size: { $ifNull: ['$student_ids', []] } } } }
  ]);
  res.json(result);
});

module.exports = router;
