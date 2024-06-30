const { renderAskQuestionPage, askQuestion } = require("../controllers/questionController")

const router = require("express").Router()
const {multer,storage} = require('../middleware/multerConfig')
const upload = multer({storage : storage})

router.route("/askquestion").get(renderAskQuestionPage).post(upload.single('image'), askQuestion)


module.exports = router 