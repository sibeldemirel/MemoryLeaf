module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define("Card", {
    cardId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deckId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pathname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Card;
};
