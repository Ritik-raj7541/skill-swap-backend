const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../../models/user");

// 1. POST
// /api/auth/user/register 

const register = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User with same details already exist!");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    name,
    password: hashPassword,
  });

  if (newUser) {
    res.status(200).json({ message: "registered" });
  } else {
    res.status(401);
    throw new Error("User is not valid");
  }
});

// 2. POST
// /api/auth/user/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "1m" }
    );
    res.status(200).json({ token: accessToken, email: email, name: user.name, id: user.id });
  } else {
    res.status(401);
    throw new Error("User is not valid");
  }
});

module.exports = { register, login};
