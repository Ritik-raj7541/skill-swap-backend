const mongoose = require('mongoose') ;

const graphSchema = mongoose.Schema({
      teacher: String,
      student: String,
      skill: String,
      linkTime: Date,
}) ;