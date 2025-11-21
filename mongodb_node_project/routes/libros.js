const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

// crear libro
router.post('/', async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json(libro);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// obtenemos todo (con el nombre del autior)
router.get('/', async (req, res) => {
  const libros = await Libro.aggregate([
    { $lookup: { from: 'autors', localField: 'autor_id', foreignField: '_id', as: 'autor' } },
    { $unwind: '$autor' },
    { $project: { titulo:1, paginas:1, categorias:1, autor: '$autor.nombre' } }
  ]);
  res.json(libros);
});

// Actualizamos paginas
router.patch('/:id/paginas', async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, { $set: { paginas: req.body.paginas } }, { new: true });
    res.json(libro);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Borrar libro
router.delete('/:id', async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ message: 'Libro eliminado' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;
