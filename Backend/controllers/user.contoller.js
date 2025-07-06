const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { empNo, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ empNo });

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    empNo,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { empNo, password } = req.body;

  const user = await userModel.findOne({ empNo }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid empNo or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid empNo or password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logged out" });
};
