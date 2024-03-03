const mongoose = require('mongoose') ;

const connectDB = async () =>{
      try{
            connection_string = process.env.CONNECTION_STRING
            const connect = await mongoose.connect(connection_string) ;
            console.log("DataBase connected") ;
      }catch(err){
            console.log(err);
            process.exit(1) ;
      }
} ;
module.exports = connectDB ;