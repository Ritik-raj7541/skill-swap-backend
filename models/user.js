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
      bio: {
            type: String,
      },
      phoneNumber: {
            type: String,
      },
      skillServes: {
            type: [],
      },
      skillNeed: {
            type: [],
      },
      groups: {
            type:[
                  {
                        id: String,
                  }
            ],
      }
}) ;
module.exports = mongoose.model("UserSchema", userSchema) ;