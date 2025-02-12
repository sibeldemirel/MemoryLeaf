const express = require("express");
const { createCard, getCardsByDeck, updateCard, deleteCard } = require("../controllers/cardController");

const router = express.Router();

router.post("/", createCard);
router.get("/:deckId", getCardsByDeck);
router.put("/:id", updateCard); 
router.delete("/:id", deleteCard);

module.exports = router;
