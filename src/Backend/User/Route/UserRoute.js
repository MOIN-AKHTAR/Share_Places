const Express = require("express");
const UserController = require("../Controller/UserController");
const fileUpload = require("../../../Shares/Middleware/File_Upload");
const Route = Express.Router();

Route.route("/").get(UserController.GetUsers);
Route.route("/signup").post(fileUpload.single("image"), UserController.Signup);
Route.route("/login").post(UserController.Login);

module.exports = Route;
