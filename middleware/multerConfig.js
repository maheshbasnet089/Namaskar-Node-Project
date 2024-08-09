const multer =require('multer')

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null, './storage') // cb(error, success ) , cb(error)
//     }, 
//     filename : function(req,file,cb){
//        cb(null, Date.now() + "-" + file.originalname)
//     }
// })

const storage = multer.diskStorage({
    filename : function(req,file,cb){
       cb(null, Date.now() + "-" + file.originalname)
    }
})


module.exports = {
    multer, 
    storage 
}