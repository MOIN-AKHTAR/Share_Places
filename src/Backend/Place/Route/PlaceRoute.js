const { Router } = require("express");
const PlaceController = require("../Controller/PlaceController");
const File_Upload = require("../../../Shares/Middleware/File_Upload");
const Auth = require("../../Utils/AuthMiddleware");
const Route = Router();

Route.use(Auth);
Route.route("/")
  .post(File_Upload.single("image"), PlaceController.CreatePlace)
  .get(PlaceController.GetAllPlaces);

Route.route("/user/:uid").get(PlaceController.GetPlacesByUserId);
Route.route("/:Id")
  .get(PlaceController.GetPlace)
  .patch(PlaceController.UpdatePlace)
  .delete(PlaceController.DeletePlace);
module.exports = Route;
