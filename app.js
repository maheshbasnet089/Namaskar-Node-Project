const express = require('express')
const app = express()

require("./model/index")
// const app = require("express")()

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home.ejs')
})


app.get("/register",(req,res)=>{
    res.render("auth/register")
})

app.get("/login",(req,res)=>{
    res.render('auth/login')
})


app.use(express.static('public/css/'))

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Project has started at port ${PORT}`)
})
