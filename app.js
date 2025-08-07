const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

// Conexión simplificada a MongoDB (sin opciones obsoletas)
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: '5d8b8592978f8bd833ca8133' }; // Usuario de prueba
  next();
});

// Rutas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});