const express =require("express");
const router =express.Router()

const {
    login,signup,sendotp,changePassword,resetPasswordToken,
    resetPassword,findUser
} = require("../controllers/Auth")

const {auth} = require("../middlewares/auth")


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.put("/changepassword", auth, changePassword)

router.get("/finduser",findUser)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router