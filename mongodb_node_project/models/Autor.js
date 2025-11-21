const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha_nacimiento: Number
});

module.exports = mongoose.model('Autor', AutorSchema);
