const mongoose = require('mongoose') ;

const graphSchema = mongoose.Schema({
      teacher: {
            type: String,
      },
      student: {
            type: String,
      },
      skill: {
            type:String,
      },
      linkTime: {
            type: Date,
      }
}) ;

module.exports = mongoose.model("graphSchema", graphSchema) ;