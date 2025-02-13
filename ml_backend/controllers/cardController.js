const Card = require("../models/Card");

exports.createCard = async (req, res) => {
  try {
    console.log("📩 Requête reçue :", req.body); 
    const { question, answer, deckId } = req.body;
    const newCard = await Card.create({ question, answer, deckId });
    console.log("✅ Carte créée :", newCard.toJSON()); 
    res.status(201).json(newCard);
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    res.status(500).json({ error: "Error creating card" });
  }
};

exports.getCardsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const cards = await Card.findAll({ where: { deckId } });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cards" });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params; 
    const { question, answer, deckId } = req.body;

    if (!id) {
      return res.status(400).json({ error: "L'ID de la carte est requis." });
    }

    const [updated] = await Card.update(
      { question, answer, deckId },
      { where: { id }, returning: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Carte non trouvée." });
    }

    const updatedCard = await Card.findByPk(id);

    console.log("✅ Carte modifiée :", updatedCard.toJSON());
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error("❌ Erreur lors de la modification :", error);
    res.status(500).json({ error: "Erreur lors de la modification de la carte." });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "L'ID de la carte est requis." });
    }

    const card = await Card.findOne({ where: { id } });

    if (!card) {
      return res.status(404).json({ error: "Carte non trouvée." });
    }

    await card.destroy();
    
    console.log(`🗑️ Carte supprimée : ${id}`);
    res.status(200).json({ message: "Carte supprimée avec succès." });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la carte." });
  }
};

