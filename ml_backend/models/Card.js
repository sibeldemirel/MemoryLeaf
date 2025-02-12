const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Card = sequelize.define("Card", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deckId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Card;
