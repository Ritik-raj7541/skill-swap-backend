const mongoose = require('mongoose') ;

const scheduleSchema = mongoose.Schema({
      groupId:{
            type: String,
      },
      userId: {
            type: String,
            },
      schedule: {
            type: {}
            }
      
}) ;

module.exports = mongoose.model("scheduleSchema", scheduleSchema) ;