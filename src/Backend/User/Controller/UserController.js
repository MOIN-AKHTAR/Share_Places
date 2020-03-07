const AppError = require("../../Utils/AppError");
const AsyncWrapper = require("../../Utils/AsyncWrapper");
const UserModel = require("../Model/UserModel");

exports.Sigup = AsyncWrapper(async (req, res, next) => {
  const { name, email, password, image } = req.body;
  const User = new UserModel({ name, email, password, image });
  const CheckUser = await UserModel.findOne({
    email
  });
  if (CheckUser) {
    return next(new AppError("Check Your Email It Should Be Unique", 400));
  }
  await User.save();
  res.status(201).json({
    Status: "Success",
    User
  });
});

exports.Login = AsyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const User = await UserModel.findOne({ email });
  if (!User) {
    return next(new AppError("Invalid Email Or Password", 401));
  }
  if (password !== User.password) {
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
