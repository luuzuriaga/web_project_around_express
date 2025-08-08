const User = require('../models/user');

// Obtener todos los usuarios
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

// Obtener un usuario por ID
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then(user => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Usuario no encontrado' });
      } else {
        res.status(400).send({ message: 'ID inválido' });
      }
    });
};

// Crear un usuario
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Datos inválidos' });
      } else {
        res.status(500).send({ message: 'Error del servidor' });
      }
    });
};