const express = require('express');
const router = express.Router();
const Estudiante = require('../models/Estudiante');
const Curso = require('../models/Curso');

// Crear estudiante
router.post('/', async (req, res) => {
  try {
    const estudiante = new Estudiante(req.body);
    await estudiante.save();
    res.status(201).json(estudiante);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Obtenemos todo
router.get('/', async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.json(estudiantes);
});

// actualizar  email
router.patch('/:id/email', async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, { $set: { email: req.body.email } }, { new: true });
    res.json(estudiante);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// eliminar estudiante
router.delete('/:id', async (req, res) => {
  try {
    await Estudiante.findByIdAndDelete(req.params.id);
    // optionally remove from cursos
    await Curso.updateMany({}, { $pull: { student_ids: req.params.id } });
    res.json({ message: 'Estudiante eliminado' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;
