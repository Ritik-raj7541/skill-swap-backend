const express = require('express') ;
const cors =  require('cors') ;
require('dotenv').config() ;
const connectDB = require('./config/dataBaseConnection')

const auth = require('./routes/User/auth') ;
const operations = require('./routes/User/operations') ;

const app = express() ;
app.use(express.json()) ;
app.use(cors()) ;
connectDB() ;

app.use('/api/auth/user', auth) ;
app.use('/api/operations/user', operations) ;

const port = process.env.PORT ;
app.listen(port, (req, res)=>{
      console.log('Port is running on port ', port) ;
}) ;