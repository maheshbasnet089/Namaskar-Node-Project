const { handleRegister, renderRegisterPage, renderLoginPage, handleLogin } = require("../controllers/authController")

const router = require("express").Router()


router.route('/register').post(handleRegister).get(renderRegisterPage)
router.route("/login").get(renderLoginPage).post(handleLogin)



module.exports = router 