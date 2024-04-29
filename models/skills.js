const mongoose = require('mongoose') ;

const skillSchema = mongoose.Schema({
      skill: {
            name: String, 
            levels: [
                  {
                        level: Number,
                        id: String,
                        skillType: String,
                  }
            ]
      }
}) ;

module.exports = mongoose.model("SkillSchema", skillSchema) ;