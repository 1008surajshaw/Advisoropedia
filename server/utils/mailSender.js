const modemailer = require("nodemailer")
require("dotenv").config();

const mailSender = async (email,title,body) =>{
    try{
        console.log(email,)
        let transporter = modemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
              user:process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            }
            
          })
          let info =await transporter.sendMail({
            from:'Advisoropedia',
            to:`${email}`,
            subject: `${title}`,
            html:`${body}`,
          })
          console.log(info);
          return info;
    }
    catch(error){

    }
}
module.exports = mailSender