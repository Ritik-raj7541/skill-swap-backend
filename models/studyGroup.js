const mongoose = require('mongoose') ;

const groupSchema = mongoose.Schema({
      allIds: [
            {
                  id: {
                        type: String,
                  },
                  linkedId: {
                        type: String,
                  },
                  confirmation: {
                        type: Boolean,
                        default: false
                  }
            }
      ]
}) ;

module.exports = mongoose.model("groupSchema", groupSchema) ;