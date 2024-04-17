const asyncHandler = require("express-async-handler");
const User = require('../../models/user') ;
const profile = asyncHandler(async (req, res) => {
  const { phoneNumber, bio, skillServes, skillNeed } = req.body;
  if (!phoneNumber) {
    res.status(400);
    throw new Error("Phone Number is mandatory mandatory!");
  }
  const email = req.params.email ;
  const existUser = await User.find({email}) ;
  if(!existUser){
      res.status(401) ;
      throw new Error("Not authorized!!") ;
  }
  const update = {
    phoneNumber, 
    bio,
    skillServes,
    skillNeed,
  } ;
  const updatedUser = await User.findOneAndUpdate({email}, update) ;
  if(!updatedUser){
    res.status(400) ;
    throw new Error("Not Udpated!") ;
  }
  res.status(200).json(updatedUser) ;
});

module.exports = {profile}  ;