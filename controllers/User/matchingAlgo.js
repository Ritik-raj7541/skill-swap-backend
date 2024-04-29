const asyncHandler = require('express-async-handler') ;
const User = require('../../models/user') ;

const matching = asyncHandler( async(req, res)=>{
      const id = req.params.id ;
      const user = await User.findById({id}) ;
      if(!user){
            res.status(400) ;
            throw new Error("Not a valid user!!");
      }
      //matching for need
      //matching for serve
      //answer by combining both
}) ;

module.exports = {matching} ;