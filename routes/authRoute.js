const { handleRegister, renderRegisterPage, renderLoginPage, handleLogin, renderForgotPasswordPage, handleForgotPassword, renderVerifyOtpPage, verifyOtp, renderResetPassword, handeResetPassword } = require("../controllers/authController")

const router = require("express").Router()


router.route('/register').post(handleRegister).get(renderRegisterPage)
router.route("/login").get(renderLoginPage).post(handleLogin)

router.route("/forgotPassword").get(renderForgotPasswordPage).post(handleForgotPassword)
router.route("/verifyOtp").get(renderVerifyOtpPage)
router.route("/verifyOtp/:id").post(verifyOtp)
router.route("/resetPassword").get(renderResetPassword)
router.route("/resetPassword/:email/:otp").post(handeResetPassword)


module.exports = router 