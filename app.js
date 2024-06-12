const express = require('express')
const { users } = require('./model/index')
const app = express()
const bcrypt = require('bcrypt')

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

    res.send("Registered successfully")
})


app.get("/login",(req,res)=>{
    res.render('auth/login')
})

app.post("/login",async (req,res)=>{
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
    
    res.send("Logged in success")
   }else{
    res.send("Invalid Password")
   }

   }else{
    res.send("No user with that email")
   }
})

app.use(express.static('public/css/'))

const PORT = 4000
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

// sudo /Applications/XAMPP/xamppfiles/xampp start