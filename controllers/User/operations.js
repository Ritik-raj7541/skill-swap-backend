const asyncHandler = require("express-async-handler");
const User = require("../../models/user");

// 1. profile completion
// METHOD- POST
// API- http://localhost:5000/api/operations/user/profileUpdate/:id

const profile = asyncHandler(async (req, res) => {
  const { phoneNumber, bio, skillServes, skillNeed } = req.body;
  if (!phoneNumber) {
    res.status(400);
    throw new Error("Phone Number is mandatory mandatory!");
  }
  const id = req.params.id;
  const existUser = await User.findById(id);
  if (!existUser) {
    res.status(401);
    throw new Error("Not authorized!!");
  }
  const update = {
    phoneNumber,
    bio,
    skillServes,
    skillNeed,
  };
  const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
  if (!updatedUser) {
    res.status(400);
    throw new Error("Not Udpated!");
  }
  res.status(200).json(updatedUser);
});

// 2. skill updation - add
// MEHTOD- PATCH
// API- http://localhost:5000/api/operations/user/skill-update/add-new-skill/:type/:id
// type- needed or serves

const skillAdd = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
  const { skills } = req.body;
  const user = await User.findById(id);
  if (!user) {
    res.status(401);
    throw new Error("Not a valid user!!");
  }
  if (type === "needed") {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { skillNeed: { $each: skills } } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401);
      throw new Error("Skill not updated!!");
    }
    res.status(200).json(updatedUser);
  } else {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { skillServes: { $each: skills } } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401);
      throw new Error("Skill not updated!!");
    }
    res.status(200).json(updatedUser);
  }
});

// 3. skill updation - delete
// MEHTOD- PATCH
// API- http://localhost:5000/api/operations/user/skill-update/remove-skill/:type/:id
// type- needed or serves

const skillDeletion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
  const { skills } = req.body;
  const user = await User.findById(id);
  if (!user) {
    res.status(401);
    throw new Error("Not a valid user!!");
  }
  if (type === "needed") {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pullAll: { skillNeed: skills } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401);
      throw new Error("Skill not updated!!");
    }
    res.status(200).json(updatedUser);
  } else {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pullAll: {skillServes: skills  } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401);
      throw new Error("Skill not updated!!");
    }
    res.status(200).json(updatedUser);
  }
});


module.exports = { profile, skillAdd, skillDeletion};
