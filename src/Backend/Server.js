const Express = require("express");
const App = require("./App");
const AppError = require("./Utils/AppError");
const CustomError = require("./Utils/CustomError");
const PlaceRoute = require("./Place/Route/PlaceRoute");
const UserRoute = require("./User/Route/UserRoute");

// ALLOW TO READ REQUEST BODY
App.use(Express.json());

// Resolving CORS Error
App.use((req, res, next) => {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    // Request methods you wish to allow
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});
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
