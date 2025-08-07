const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre es obligatorio'],
    minlength: [2, 'Mínimo 2 caracteres'],
    maxlength: [30, 'Máximo 30 caracteres'],
  },
  about: {
    type: String,
    required: [true, 'Descripción es obligatoria'],
    minlength: [2, 'Mínimo 2 caracteres'],
    maxlength: [30, 'Máximo 30 caracteres'],
  },
  avatar: {
    type: String,
    required: [true, 'Avatar es obligatorio'],
    validate: {
      validator: (v) => validator.isURL(v), // Valida que sea una URL válida
      message: 'URL inválida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);