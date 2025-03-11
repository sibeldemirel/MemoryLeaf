const { Deck } = require("../models");
const { Op } = require("sequelize");

const normalizeToPathname = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
};

exports.createDeck = async (req, res) => {
  try {
    const { name, userId, numberOfCards, newCards, reviewCards } = req.body;

    const pathname = normalizeToPathname(name);

    const deck = await Deck.create({
      name,
      pathname,
      userId,
      numberOfCards,
      newCards,
      reviewCards
    });

    res.status(201).json(deck);
  } catch (error) {
    console.error("❌ Erreur lors de la création du deck :", error);
    res.status(500).json({ error: "Erreur lors de la création du deck" });
  }
};

exports.getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.findAll();

    res.json(decks);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des decks :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des decks" });
  }
};

exports.getDecksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "L'ID utilisateur est requis" });
    }

    const decks = await Deck.findAll({ where: { userId } });

    if (decks.length === 0) {
      return res.status(404).json({ message: "Aucun deck trouvé pour cet utilisateur" });
    }

    res.json(decks);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des decks :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des decks" });
  }
};


exports.getDecksById = async (req, res) => {
  try {
    const { id } = req.params;

    const deck = await Deck.findOne({ where: { deckId: id } });

    if (!deck) {
      return res.status(404).json({ error: "Deck non trouvé" });
    }

    res.json(deck);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du deck :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du deck" });
  }
};

exports.getDeckByName = async (req, res) => {
  try {
    const { pathname } = req.params;

    const deck = await Deck.findOne({
      where: { pathname: { [Op.iLike]: pathname } }
    });

    if (!deck) {
      return res.status(404).json({ error: "Deck non trouvé" });
    }

    res.json(deck);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du deck :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du deck" });
  }
};

exports.updateDeck = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, numberOfCards, newCards, reviewCards } = req.body;

    const deck = await Deck.findOne({ where: { deckId: id } });

    if (!deck) {
      return res.status(404).json({ error: "Deck non trouvé" });
    }

    const updatedName = name || deck.name;
    const updatedPathname = normalizeToPathname(updatedName);

    await deck.update({
      name: updatedName,
      pathname: updatedPathname,
      numberOfCards,
      newCards,
      reviewCards
    });

    res.json(deck);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du deck :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du deck" });
  }
};

exports.deleteDeck = async (req, res) => {
  try {
    const { id } = req.params;

    const deck = await Deck.findByPk(id);
    if (!deck) {
      return res.status(404).json({ error: "Deck non trouvé" });
    }

    await deck.destroy();

    res.json({ message: "Deck supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du deck :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du deck" });
  }
};

