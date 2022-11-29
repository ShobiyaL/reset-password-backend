const express = require('express');
const port = 4000;
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config()
const dbConnect = require('./config/database');
const userRouter = require('./routes/userRouter');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/user',userRouter);

dbConnect()
  .then(()=>{
    app.listen(process.env.PORT || port, ()=>{
    console.log("Server Running Successfully on the port " + port);
    })
  })
  .catch((e) => console.log(e));
