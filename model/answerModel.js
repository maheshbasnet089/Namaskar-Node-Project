module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("answer", {
      answerText: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    
    });
    return Answer;
  };