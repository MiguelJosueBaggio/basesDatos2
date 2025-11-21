const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');//rutas para caragr datos
const Libro = require('../models/Libro');

// Creamos el autor 
router.post('/', async (req, res) => {
  try {
    const autor = new Autor(req.body);//
    await autor.save();
    res.status(201).json(autor);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Obtenemos el autor
router.get('/', async (req, res) => {
  const autores = await Autor.find();
  res.json(autores);
});

// Actualizar el autor
router.put('/:id', async (req, res) => {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(autor);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Delete autor + libros
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Libro.deleteMany({ autor_id: id });
    await Autor.findByIdAndDelete(id);
    res.json({ message: 'Autor y sus libros eliminados' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Agregaciones: promedio paginas por autor
router.get('/aggs/promedio-paginas', async (req, res) => {
  const result = await Libro.aggregate([
    { $group: { _id: '$autor_id', promedio_paginas: { $avg: '$paginas' } } },
    { $lookup: { from: 'autors', localField: '_id', foreignField: '_id', as: 'autor' } },
    { $unwind: { path: '$autor', preserveNullAndEmptyArrays: true } },
    { $project: { autor: '$autor.nombre', promedio_paginas: 1 } }
  ]);
  res.json(result);
});

// Autores con cantidad de libros
router.get('/aggs/cantidad-libros', async (req, res) => {
  const result = await Libro.aggregate([
    { $group: { _id: '$autor_id', cantidad_libros: { $sum: 1 } } },
    { $lookup: { from: 'autors', localField: '_id', foreignField: '_id', as: 'autor' } },
    { $unwind: { path: '$autor', preserveNullAndEmptyArrays: true } },
    { $project: { autor: '$autor.nombre', cantidad_libros: 1 } }
  ]);
  res.json(result);
});

module.exports = router;
