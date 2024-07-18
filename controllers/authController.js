const { users, questions } = require("../model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils /sendEmail")
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

    await sendEmail({
        email : email , 
        text : "Thank you for registering", 
        subject : "Welcome to Project"
    })
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



 exports.renderForgotPasswordPage = (req,res)=>{
    res.render("./auth/forgotPassword")
 }

 exports.handleForgotPassword = async(req,res)=>{
    const {email} = req.body 
    const data = await users.findAll({
        where : {
            email : email 
        }
    })
    if(data.length === 0 ) return res.send("No user registered with that email")

    const otp = Math.floor(Math.random() * 1000) + 9999 

    // send that otp to above incoming email 
    await sendEmail({
        email : email, 
        subject : "Your reset password OTP", 
        text : `Your otp is ${otp}`
    })
    data[0].otp = otp  
    await data[0].save()

    res.redirect("/verifyOtp")
 }

 exports.renderVerifyOtpPage = (req,res)=>{
    res.render("./auth/verifyOtp")
 }