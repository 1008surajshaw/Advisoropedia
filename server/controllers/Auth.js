const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdate");
const Post = require("../models/Post");
const crypto = require("crypto");

//otp

exports.sendotp = async (req, res) => {
  try {
    const { email, userName } = req.body;
    const cheackUserPresent = await User.findOne({ email });

    if (cheackUserPresent) {
      return res.status(401).json({
        sucsess: false,
        message: "Email is already taken",
      });
    }
    const userNameVer = await User.findOne({userName});
    if(userNameVer) {
      return res.status(400).json({
        success: false,
        message: "UserName  is already taken",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generator:", otp);

    //check unique otp or not

    let result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      //    result =await OTP.findOne({otp:otp});
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      messaga: "otp sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    console.log("come in catch bolock in sendotp ");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//sign up

exports.signup = async (req, res) => {
  //data fetch from request ki body
  try {
    const {
      userName,
      email,
      password,
      confirmPassword,
      contactNumber,
      otp,
    } = req.body;

    if (  
      !userName ||
      !password ||
      !confirmPassword ||
      !email ||
      !otp ||
      !contactNumber
    ) {
      return res.status(403).json({
        success: false,
        message: "all fields are required",
      });
    }
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password value are not same",
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user is already register",
      });
    }
    const userNameVer = await User.findOne({userName});
    if(userNameVer) {
      return res.status(400).json({
        success: false,
        message: "userName  is already taken",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  
    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        messaga: "invalid otp",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      contactNumber,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${userName}`,
    });

    return res.status(200).json({
      success: true,
      message: "user is register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messaga: "user cannot registered. sign in me catch me aa gya",
    });
  }
};

//log in

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required,please try again",
      });
    }

    const user = await User.findOne({ email }).populate("post");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "plzz sign  in first",
      });
    }
    // const Payload ={
    //     email:user.email,
    //     id:user._id,
    //     role:user.accountType,
    // };
    //generate password,  after password matching
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
    
      user.password = undefined;

      
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        messaga: "loged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure, come in catch block in log in time",
    });
  }
};

// change password

exports.changePassword = async (req, res) => {
  try {
    const userId = await User.findById(req.user.id);
   
    console.log(userId,"user id is this ")
    const { oldPassword, password } = req.body;

    const isPasswordMatch = await bcrypt.compare(oldPassword, userId.password);
    console.log(isPasswordMatch,"is password match")
    if (!isPasswordMatch) {
      return res.status(400).json({
        messaga:"password is invalid",
        success:false
      });
    }
    
    const encryptredPassword = await bcrypt.hash(password, 10);

    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptredPassword },
      { new: true }
    ).populate("post");

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "password update Confirmation",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

//reset password token

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "your email is not recognised with us",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const updateDetail = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(email, "password ResetLink", `password Reset Link ${url}`);

    return res.json({
      success: true,
      messaga:
        "email sent successfully , please check email and change password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "com ein catch block",
    });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "password not matching",
      });
    }
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }
    if(!userDetails.resetPasswordExpires >  Date.now() ){
        return res.json({
            success:false,
            message:"time quantum expires"
        })
     }
     const hashedPassword = await bcrypt.hash(password,10);
     
     await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
     );
 
     return res.status(200).json({
        success:true,
        message:'password reset sucessfully'
     });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message :"come in reset password catch block",
    })
  }
};

exports.findUser = async (req,res) =>{
  try{
    const { userName } = req.body;
    console.log(userName,"user name is this")
  
    const user = await User.findOne({ userName });

    if(!user){
      return res.status(200).json({
        success:true,
        message:"true"
      });
    }
    return res.status(200).json({
      success:true,
      message:"false"
    })

  }
  catch(error){
    return res.status(500).json({
      success: false,
      message: "come in  catch block",
    });
  }
}