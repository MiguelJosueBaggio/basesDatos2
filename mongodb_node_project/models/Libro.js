const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  paginas: Number,
  categorias: [String],
  autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true }
});

module.exports = mongoose.model('Libro', LibroSchema);
