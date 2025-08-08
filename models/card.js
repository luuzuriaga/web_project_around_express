const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre es obligatorio'],
    minlength: [2, 'Mínimo 2 caracteres'],
    maxlength: [30, 'Máximo 30 caracteres'],
  },
  link: {
    type: String,
    required: [true, 'Enlace es obligatorio'],
    validate: {
      validator: (v) => validator.isURL(v), // Valida que sea una URL válida
      message: 'URL inválida',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);