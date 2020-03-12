const AsyncWrapper = require("../Utils/AsyncWrapper");
const AppError = require("../Utils/AppError");
const JWT = require("jsonwebtoken");
module.exports = AsyncWrapper(async (req, res, next) => {
  let Token;
  if (req.headers.authorization) {
    Token = req.headers.authorization.split(" ")[1];
  }
  if (!Token) {
    return next(new AppError("You Are Not Authorized", 401));
  }
  const Payload = JWT.verify(Token, "MY_SUPER_SECRET_KEY");
  req.userId = Payload.Id;
  next();
});
