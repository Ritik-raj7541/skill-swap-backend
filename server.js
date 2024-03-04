const express = require('express') ;
const cors =  require('cors') ;
require('dotenv').config() ;
const connectDB = require('./config/dataBaseConnection')

const auth = require('./routes/User/auth') ;

const app = express() ;
app.use(express.json()) ;
app.use(cors()) ;
connectDB() ;

app.use('/api/auth/user', auth) ;

const port = process.env.PORT ;
app.listen(port, (req, res)=>{
      console.log('Port is running on port ', port) ;
}) ;