const { questions, users } = require("../model")

exports.renderAskQuestionPage = (req,res)=>{
    res.render("questions/askQuestion")
}

exports.askQuestion = async (req,res)=>{
    const {title,description}  = req.body 
    console.log(req.body)
    console.log(req.file)
    const userId = req.userId 
    const fileName = req.file.filename
    if(!title || !description ){
        return res.send("Please provide title, description")
    }
    await questions.create({
        title, 
        description, 
        image : fileName,
        userId
    })
    res.redirect("/")
}

exports.getAllQuestion = async (req,res)=>{
    const data = await questions.findAll({
        include : [
            {
                model : users
            }
        ]
    })
}