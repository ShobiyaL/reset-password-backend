const { v4: uuid } = require("uuid");

const User = require('../model/users');

const forgetPassword = async(req,res)=>{
    const {email}= req.body;
    try {
        if(!email){
            return res.status(400).json({message:"Field should not be empty"})
        }
        const userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({message:"Mail not received! your emailId is invalid"})
        }
        const resetPasswordCode = uuid();
        const userId = userData._id;
        const result = await User.findByIdAndUpdate(
            userId,
            {
              $set: { resetPasswordCode },
            },
            { new: true }
          );
        if(result){
            const tokenPayload = {
                email: result.email,
                id: result._id,
              };
              const newToken = await createTokenFunc(tokenPayload);

      const resetPassLongString = `${resetPasswordCode}????${newToken}`;
      // const array = resetPassLongString.split("????").join("   ");
      // console.log(array, "arr");

      //(resetPassLongString)---> resetPasswordCode + jwt -sending both to client mail,
      //so jwt canbe used to verify its expiration time(1h)and
      //also check resetcode in db in (resetpassword route)
      const emailResponse = await mailerFunc(result.email, resetPassLongString);
      console.log(emailResponse, "email status response");
    
        }
        res.json({ message: "check your mail for further instructions.." });
    } catch (error) {
        console.log(error, "error");
    res.status(400).json({
      message: "password reset functionality is corrupted...Request not fulfilled",
    });
    }
}

module.exports=forgetPassword;