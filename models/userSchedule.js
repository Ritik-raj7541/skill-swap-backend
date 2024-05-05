const mongoose = require('mongoose') ;

const userScheduleSchema = mongoose.Schema({
      userId: {
            type: String,
      },
      schedule: {
            type: []
      }
}) ;

module.exports = mongoose.model("userScheduleSchema", userScheduleSchema) ;