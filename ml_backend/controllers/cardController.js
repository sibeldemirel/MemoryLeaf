const { Card, Deck } = require("../models");

const normalizeToPathname = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

exports.createCard = async (req, res) => {
  try {
    console.log("📩 Requête reçue :", req.body);
    const { question, answer, deckId } = req.body;

    if (!question || !answer || !deckId) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const pathname = normalizeToPathname(question); // Génération automatique

    const newCard = await Card.create({ question, answer, deckId, pathname });

    const deck = await Deck.findOne({ where: { deckId } });
    if (deck) {
      await deck.update({
        numberOfCards: deck.numberOfCards + 1,
        newCards: deck.newCards + 1,
      });
    }

    console.log("✅ Carte créée :", newCard.toJSON());
    res.status(201).json(newCard);
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de la carte" });
  }
};

exports.getCardsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    if (!deckId) {
      return res.status(400).json({ error: "L'ID du deck est requis." });
    }

    const cards = await Card.findAll({ where: { deckId } });

    if (!cards.length) {
      return res.status(404).json({ error: "Aucune carte trouvée pour ce deck." });
    }

    res.json(cards);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des cartes :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des cartes." });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { cardId } = req.params; 
    const { question, answer, deckId } = req.body;

    if (!cardId) {
      return res.status(400).json({ error: "L'ID de la carte est requis." });
    }

    const updatedCard = await Card.findOne({ where: { cardId } });
    if (!updatedCard) {
      return res.status(404).json({ error: "Carte non trouvée." });
    }

    await updatedCard.update({ question, answer, deckId });

    console.log("✅ Carte modifiée :", updatedCard.toJSON());
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error("❌ Erreur lors de la modification :", error);
    res.status(500).json({ error: "Erreur lors de la modification de la carte." });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    if (!cardId) {
      return res.status(400).json({ error: "L'ID de la carte est requis." });
    }

    const card = await Card.findOne({ where: { cardId } });
    if (!card) {
      return res.status(404).json({ error: "Carte non trouvée." });
    }

    const deck = await Deck.findOne({ where: { deckId: card.deckId } });

    await card.destroy();

    if (deck) {
      await deck.update({
        numberOfCards: deck.numberOfCards - 1,
      });
    }

    console.log(`🗑️ Carte supprimée : ${cardId}`);
    res.status(200).json({ message: "Carte supprimée avec succès." });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la carte." });
  }
};