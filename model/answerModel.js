module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("answer", {
      answerText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes : {
        type : DataTypes.INTEGER, 
        defaultValue : 0
      }

    
    });
    return Answer;
  };