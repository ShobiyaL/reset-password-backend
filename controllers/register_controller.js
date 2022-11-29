const User = require('../model/users');
const { encryptPasswordFunc } = require('../utils/hashFunction');
const { createTokenFunc } = require('../utils/tokenFunction');

const register = async (req,res)=>{
    const {email,name,password} = req.body;
    try {
        if(!email || !name || !password){
            return res.status(400).json({message:"Enter values the field should not be empty"})
        }
        const duplicateData = await User.findOne({email})
        if(duplicateData){
           return res.status(400).json({message:"User already exists"})
        }
        //Creating hashed password
        const hashedPassword = await encryptPasswordFunc(password);
        const createdUser = await User.create({
            email,
            name,
            password: hashedPassword,
        })
       if(createdUser){
        const jwtPayload ={
            email: createdUser.email,
            id: createdUser._id
        }
        const newToken = await createTokenFunc(jwtPayload);
        res.json({
            newToken,
            message:"Registration Done",
            
        })
       }
    } catch (error) {
        
        res.status(400).json({message:"Error while registering user"})
        console.log(error,"Error while registering user")
    }
}

module.exports = register;