const express = require('express') ;
const cors =  require('cors') ;
require('dotenv').config() ;
const connectDB = require('./config/dataBaseConnection')

const app = express() ;
app.use(express.json()) ;
app.use(cors()) ;
connectDB() ;

const port = process.env.PORT ;
app.listen(port, (req, res)=>{
      console.log('Port is running on port ', port) ;
}) ;