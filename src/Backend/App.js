const Express = require("express");
const Mongoose = require("mongoose");

// Handling Unhadled Exceptions
process.on("uncaughtException", err => {
  console.log("UNHADLED EXCEPTION ...");
  console.log(err.name, err.message);
  console.log(err.stack);
  console.log("Shutting Down Server ...");
  process.exit(1);
  // 0 stand for Success
  // 1 stands for Reject
});
// When there is some exception then it is neccessary to close server because entire node will go into
// unclean state to fix that process need to close and restart-

// Making Application As Express-
const App = Express();
// Allow Req To Append Body-
App.use(Express.json());
// Making Connection-
Mongoose.connect("mongodb://127.0.0.1:27017/SharePlaces", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(_ => {
    console.log("Connected To Mongodb Successfully :)");
  })
  .catch(err => {
    console.log("Not Connected To Mongodb :)");
  });
module.exports = App;
