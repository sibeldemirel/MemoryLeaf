const express = require("express");
const { createDeck, getAllDecks, getDecksByUser, getDecksById, getDeckByName, updateDeck, deleteDeck } = require("../controllers/deckController");

const router = express.Router();

router.post("/", createDeck);
router.get("/", getAllDecks);
router.get("/user/:userId", getDecksByUser);
router.get("/:id", getDecksById);
router.get("/name/:name", getDeckByName);
router.put("/:id", updateDeck);
router.delete("/:id", deleteDeck);


module.exports = router;