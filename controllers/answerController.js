
const { QueryTypes } = require("sequelize")
const { answers, sequelize } = require("../model")


exports.handleAnswer = async(req,res)=>{
    const userId = req.userId 
    const {answer} = req.body 
    const {id:questionId} = req.params 
   const data =  await answers.create({
        answerText : answer, 
        userId, 
        questionId,
    })
    console.log(data)
    await sequelize.query(`CREATE TABLE likes_${data.id} (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
        userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    ) `,{
        type : QueryTypes.CREATE
    })
    
    res.redirect(`/question/${questionId}`)
}