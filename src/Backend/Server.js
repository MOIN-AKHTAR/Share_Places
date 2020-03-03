const Express = require("express");
const App = require("./App");
const AppError = require("./Utils/AppError");
const CustomError = require("./Utils/CustomError");
const PlaceRoute = require("./Place/Route/PlaceRoute");
const UserRoute = require("./User/Route/UserRoute");

// ALLOW TO READ REQUEST BODY
App.use(Express.json());
// API'S ENDPOINTS
App.use("/api/v1/place", PlaceRoute);
App.use("/api/v1/user", UserRoute);
// PATH NOT FOUND
App.all("*", (req, res, next) => {
  return next(new AppError("Unable To Find This Path", 404));
});
// ERROR MIDDLEWARE
App.use(CustomError);
// LISTENING AT PORT 5000
const SERVER = App.listen(5000, err => {
  if (err) {
    return console.log("SERVER IS NOT RUNNING :(");
  }
  console.log("SERVER IS RUNNING AT PORT 5000 :)");
});
process.on("unhandledRejection", err => {
  console.log("UNHANDELED REJECTION OCCUR !!!");
  console.log("----- SERVER IS SHUTTING DOWN -----");
  console.log(err.stack);
  console.log(err.name);
  console.log(err.message);
  SERVER.close(() => {
    process.exit(1);
    // 0 stands for success-
    // 1 stands for reject
  });
});
