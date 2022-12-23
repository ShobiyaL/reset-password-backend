const nodemailer = require('nodemailer');

const mailFunction = async (toAddress,resetPassLongString)=>{
    try{
      const transporter = await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.SENDER_MAIL_ID,
            password:process.env.SENDER_MAIL_PASSWORD
        }
      });
      if(transporter){
        const mailContents ={
            from:process.env.SENDER_MAIL_ID,
            to:toAddress,
            subject:"Password reset code",
            text:`Follow the link below to set a new password:   
            ${process.env.CLIENT_RESETFLOW_URL}/${resetPassLongString} `
        }
        const result = await transporter.sendMail(mailContents);
        return result;
      }

    }catch(error){
        console.log("error in sending mail -> ", error);
    }
}