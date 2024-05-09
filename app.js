const express = require('express')
const app = express()

// const app = require("express")()


app.get('/',(req,res)=>{
    res.send("<h1>This is home page</h1>")
})

app.get("/about",(req,res)=>{
    res.send("This is about page")
})



app.listen(3000,()=>{
    console.log("Project has started at port 3000")
})
