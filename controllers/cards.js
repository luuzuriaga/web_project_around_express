const Card = require('../models/card');

// Obtener todas las tarjetas
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

// Crear una tarjeta
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Datos inválidos' });
      } else {
        res.status(500).send({ message: 'Error del servidor' });
      }
    });
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' });
    }
    res.send({ message: 'Tarjeta eliminada correctamente', data: card });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'ID de tarjeta inválido' });
    } else {
      res.status(500).send({ message: 'Error del servidor' });
    }
  }
};