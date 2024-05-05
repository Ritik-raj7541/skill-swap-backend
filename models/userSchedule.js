const mongoose = require('mongoose') ;

const userScheduleSchema = mongoose.Schema({
      groupId: {
            type: String,
      },
      schedule: {
            type: []
      }
}) ;

module.exports = mongoose.model("userScheduleSchema", userScheduleSchema) ;