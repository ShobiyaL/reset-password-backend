const mongoose = require('mongoose');

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected");
    }catch(error){
        console.log(error.message, "error in connecting DB");
    }
};

module.exports = dbConnect;