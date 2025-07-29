const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const usersPath = path.join(__dirname, '../data/users.json');

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(usersPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ message: 'Error al leer los datos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'ID de usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al leer los datos' });
  }
});

module.exports = router;
// (línea vacía al final)
