const express = require('express')
const { users, answers, sequelize } = require('./model/index')
const app = express()
require("dotenv").config()

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
const socketio = require("socket.io")
const { QueryTypes } = require('sequelize')


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
const server = app.listen(PORT,()=>{
    console.log(`Project has started at port ${PORT}`)
})

// sudo /Applications/XAMPP/xamppfiles/xampp start

const io = socketio(server,{
  cors : {
    origin : "*"
  }
})

io.on('connection',(socket)=>{
  socket.on('like',async ({answerId,cookie})=>{
   const answer = await answers.findByPk(answerId)
   if(answer && cookie){
    const decryptedResult =  await promisify(jwt.verify)(cookie,'hahaha')
    if(decryptedResult){
     const user = await sequelize.query(`SELECT * FROM likes_${answerId} WHERE userId=${decryptedResult.id}`,{
      type : QueryTypes.SELECT
     })
     if(user.length === 0){
       await sequelize.query(`INSERT INTO likes_${answerId} (userId) VALUES(${decryptedResult.id})`,{
          type : QueryTypes.INSERT
        }) 

     }
    }
  const likes =  await sequelize.query(`SELECT * FROM likes_${answerId}`,{
    type : QueryTypes.SELECT
   })
   
   const likesCount = likes.length
   await answers.update({
    likes : likesCount
   },{
    where : {
      id : answerId
    }
   })
   console.log(likesCount)
   socket.emit('likeUpdate',{likesCount,answerId}) 
   }
  })
})