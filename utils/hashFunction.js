const bcrypt = require('bcrypt');

const encryptPasswordFunc = async (enteredPassword)=>{
    const salt = await bcrypt.genSalt(10);
    const encryptedData = await bcrypt.hash(enteredPassword, salt);
    return encryptedData;
}

const decryptPasswordFunc = async (enteredPassword, hashedPassword) =>{
    const result =await bcrypt.compare(enteredPassword, hashedPassword);
    return result;
}

module.exports = {encryptPasswordFunc,decryptPasswordFunc};