const mongoose = require('mongoose') ;

const userSchema = mongoose.Schema({
      email: {
            type: String,
            required: true
      },
      name: {
            type: String,
            required: true,
      },
      password: {
            type: String,
            required: true,
      },
      phoneNumber: {
            type: String,
      },
      skillServer: {
            type: [],
      },
      skillNeed: {
            type: [],
      }
}) ;
module.exports = mongoose.model("UserSchema", userSchema) ;