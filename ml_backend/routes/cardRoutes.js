const express = require("express");
const { createCard, getCardsByDeck, updateCard, deleteCard } = require("../controllers/cardController");

const router = express.Router();

router.post("/", createCard);
router.get("/deck/:deckId", getCardsByDeck); 
router.put("/:cardId", updateCard);  
router.delete("/:cardId", deleteCard);

module.exports = router;
