const { response } = require('express');
const User = require('../model/users');
const { decryptPasswordFunc } = require('../utils/hashFunction');
const { createTokenFunc } = require('../utils/tokenFunction');


const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        if(!email||!password){
            return res.status(400).json({message:"Field required"})
        }
        const userData = await User.findOne({email})
        if(!userData){
            return res.status(404).json({message:"Wrong email/password"})
        }
        const hashedPassword = userData.password;
        const passwordMatch = await decryptPasswordFunc(password, hashedPassword)
        if(!passwordMatch){
            return res.status(404).json({message:"Wrong password/email"})
        }
        const tokenPayload ={
            email:userData.email,
            id:userData._id
        }
        const newToken = await createTokenFunc(tokenPayload);
        res.json({
            newToken,
            message:"Logged in successfully"
        })
    } catch (error) {
        res.status(400).json({message:"Error in login",error});
    }
}

module.exports = login;