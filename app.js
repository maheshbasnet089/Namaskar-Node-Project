const express = require('express')
const app = express()

// const app = require("express")()

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    const name = "Manish Basnet"
    const address = "Itahari"
    res.render('home.ejs',{data:name,address })
})

app.get("/about",(req,res)=>{
    res.render('about')
})



app.listen(3000,()=>{
    console.log("Project has started at port 3000")
})
