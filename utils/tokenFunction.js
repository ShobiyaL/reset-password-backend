const jwt = require('jsonwebtoken')

const createTokenFunc = async (payload)=>{
    console.log(payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.EXPIRY
    })
    return token;
}

const verifyTokenFunc = async (clientToken)=>{
    const decodedPayload = await jwt.verify(clientToken, process.env.JWT_SECRET_KEY);
    return decodedPayload;
}

module.exports ={createTokenFunc,verifyTokenFunc};