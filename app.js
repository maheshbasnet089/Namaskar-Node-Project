const express = require('express')
const { users } = require('./model/index')
const app = express()

const { renderHomePage, renderRegisterPage, handleRegister, renderLoginPage } = require('./controllers/authController')
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
require("./model/index")
// const app = require("express")()
const authRoute  = require("./routes/authRoute")
const questionRoute = require("./routes/questionRoute")
const answerRoute = require("./routes/answerRoute")
const {promisify} = require('util')
const session = require('express-session')
const flash = require("connect-flash")
const catchError = require('./utils /catchError')

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true})) // ssr 
app.use(express.json()) // external like react, vuejs 
app.use(cookieParser())
app.use(session({
  secret : "thisissecretforsession", 
  resave : false, 
  saveUninitialized : false
}))
app.use(flash())

app.use(async (req,res,next)=>{
   const token =  req.cookies.jwtToken 
  try {
    const decryptedResult =  await promisify(jwt.verify)(token,'hahaha')
    if(decryptedResult){
        res.locals.isAuthenticated = true 
    }else{
         res.locals.isAuthenticated = false 
    }
  } catch (error) {
    res.locals.isAuthenticated = false 
  }
   next()
})

app.get('/',catchError(renderHomePage))

// localhost:3000, localhost:3000/api/ + /register ---> localhost:3000/api//register
app.use("/",authRoute)
app.use("/",questionRoute)
app.use("/answer",answerRoute)

app.use(express.static("./storage/"))
app.use(express.static('public/css/'))

const PORT = 4000
app.listen(PORT,()=>{
    console.log(`Project has started at port ${PORT}`)
})

// sudo /Applications/XAMPP/xamppfiles/xampp start