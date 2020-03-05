const Express = require("express");
const UserController = require("../Controller/UserController");

const Route = Express.Router();

Route.route("/").get(UserController.GetUsers);
Route.route("/signup").post(UserController.Sigup);
Route.route("/login").post(UserController.Login);

module.exports = Route;
