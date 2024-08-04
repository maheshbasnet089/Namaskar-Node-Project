const { handleRegister, renderRegisterPage, renderLoginPage, handleLogin, renderForgotPasswordPage, handleForgotPassword, renderVerifyOtpPage, verifyOtp, renderResetPassword, handeResetPassword, logout } = require("../controllers/authController")
const catchError = require("../utils /catchError")


const router = require("express").Router()


router.route('/register').post(catchError(handleRegister)).get(renderRegisterPage)
router.route("/login").get(catchError(renderLoginPage)).post(catchError(handleLogin))
router.route("/logout").get(logout)

router.route("/forgotPassword").get(renderForgotPasswordPage).post(handleForgotPassword)
router.route("/verifyOtp").get(renderVerifyOtpPage)
router.route("/verifyOtp/:id").post(verifyOtp)
router.route("/resetPassword").get(renderResetPassword)
router.route("/resetPassword/:email/:otp").post(handeResetPassword)


module.exports = router 