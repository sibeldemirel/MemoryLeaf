module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define("Deck", {
      deckId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      pathname: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      userId: {
          type: DataTypes.UUID,
          allowNull: false,
      },
      numberOfCards: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
      },
      newCards: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
      },
      reviewCards: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
      }
  });

  return Deck;
};
