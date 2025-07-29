const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const cardsPath = path.join(__dirname, '../data/cards.json');

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ message: 'Error al leer los datos' });
  }
});

module.exports = router;
// (línea vacía al final)
