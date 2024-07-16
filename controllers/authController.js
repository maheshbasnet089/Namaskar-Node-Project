const { users, questions } = require("../model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.renderHomePage = async (req,res)=>{
    const data = await questions.findAll(
        {
            include : [{
                model : users,
                attributes : ["username"]
            }]
        }
    ) // return array 
    console.log(data)
    res.render('home.ejs',{data})
}

exports.renderRegisterPage = (req,res)=>{
    res.render("auth/register")
}

exports.renderLoginPage = (req,res)=>{
    res.render('auth/login')
}

exports.handleRegister = async (req,res)=>{
    // const username = req.body.username 
    // const password = req.body.password 
    // const email = req.body.email 
    const {username,password,email} = req.body
    if(!username || !password || !email){
        return res.send("Please provide username,email,password")
    }
    // const data = await users.findAll({
    //     where : {
    //         email : email
    //     }
    // })
  
    // if(data.length > 0){
    //     return res.send("Already registered email")
    // }
     await users.create({
        email, 
        password : bcrypt.hashSync(password,10), 
        username
    })

    res.redirect('/login')
}


exports.handleLogin = async (req,res)=>{
    const {email,password} = req.body 
    if(!email || !password){
     return res.send("Please provide email,password")
    }
    //email check 
    const [data] = await users.findAll({
     where : {
         email : email 
     }
    })
    if(data){
     // next password check garney
    const isMatched =  bcrypt.compareSync(password,data.password)
    if(isMatched){
    const token =  jwt.sign({id : data.id},'hahaha',{
         expiresIn : '30d'
     })
     res.cookie('jwtToken',token)
     res.redirect("/")
    }else{
     res.send("Invalid Password")
    }
 
    }else{
     res.send("No user with that email")
    }
 }