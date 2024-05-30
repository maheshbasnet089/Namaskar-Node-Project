const express = require('express')
const { users } = require('./model/index')
const app = express()

require("./model/index")
// const app = require("express")()

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true})) // ssr 
app.use(express.json()) // external like react, vuejs 

app.get('/',(req,res)=>{
    res.render('home.ejs')
})


app.get("/register",(req,res)=>{
    res.render("auth/register")
})

// app.get("/users",async (req,res)=>{
//     const data = await users.findAll()
//     res.json({
//         data 
//     })
// })

app.post("/register",async (req,res)=>{
    // const username = req.body.username 
    // const password = req.body.password 
    // const email = req.body.email 
    const {username,password,email} = req.body

    await users.create({
        email, 
        password, 
        username
    })

    res.send("Registered successfully")


})


app.get("/login",(req,res)=>{
    res.render('auth/login')
})
app.use(express.static('public/css/'))

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Project has started at port ${PORT}`)
})


// rest api 
/* 
/getBlogs - get
/singleblog/:id - get 
/deleteblog/:id - delete 
/udpateblog/:id - delete 
/addblog - post

*/



// restful apis
/* 
/blogs - get,post  
/blogs/:id - get , patch/put, delete 


*/

