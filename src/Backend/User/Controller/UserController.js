const AppError = require("../../Utils/AppError");
const AsyncWrapper = require("../../Utils/AsyncWrapper");
const UserModel = require("../Model/UserModel");

exports.Signup = AsyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const User = new UserModel({
    name,
    email,
    password,
    image: req.file.path
  });
  const CheckUser = await UserModel.findOne({
    email
  });
  if (CheckUser) {
    return next(new AppError("Check Your Email It Should Be Unique", 400));
  }
  await User.save();
  res.status(201).json({
    Status: "Success",
    User: User.toObject({ getters: true })
  });
});

exports.Login = AsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const User = await UserModel.findOne({ email });
  if (!User) {
    return next(new AppError("Invalid Email Or Password", 401));
  }
  const isAuthenticated = await User.decryptPassword(password, User.password);
  if (!isAuthenticated) {
    return next(new AppError("Invalid Email Or Password", 401));
  }
  res.status(200).json({
    Status: "Succes",
    User: User.toObject({ getters: true })
  });
});

exports.GetUsers = AsyncWrapper(async (req, res, next) => {
  const UserArray = UserModel.find({});
  const Users = await UserArray.select("-password");
  res.status(200).json({
    Status: "Succes",
    Count: Users.length,
    Users
  });
});
