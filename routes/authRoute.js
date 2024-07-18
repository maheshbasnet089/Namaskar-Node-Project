const { handleRegister, renderRegisterPage, renderLoginPage, handleLogin, renderForgotPasswordPage, handleForgotPassword, renderVerifyOtpPage } = require("../controllers/authController")

const router = require("express").Router()


router.route('/register').post(handleRegister).get(renderRegisterPage)
router.route("/login").get(renderLoginPage).post(handleLogin)

router.route("/forgotPassword").get(renderForgotPasswordPage).post(handleForgotPassword)
router.route("/verifyOtp").get(renderVerifyOtpPage)


module.exports = router 