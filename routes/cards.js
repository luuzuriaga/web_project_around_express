const express = require('express');
const router = express.Router();
const {
  getCards,
  createCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);

module.exports = router;