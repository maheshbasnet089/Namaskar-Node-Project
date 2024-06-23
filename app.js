const express = require('express')
const { users } = require('./model/index')
const app = express()

const { renderHomePage, renderRegisterPage, handleRegister, renderLoginPage } = require('./controllers/authController')

require("./model/index")
// const app = require("express")()

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true})) // ssr 
app.use(express.json()) // external like react, vuejs 

app.get('/',renderHomePage)


app.get("/register",renderRegisterPage)

// app.get("/users",async (req,res)=>{
//     const data = await users.findAll()
//     res.json({
//         data 
//     })
// })

app.post("/register",handleRegister)


app.get("/login",renderLoginPage)

app.post("/login",)

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