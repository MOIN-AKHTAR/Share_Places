const { Router } = require("express");
const PlaceController = require("../Controller/PlaceController");
const File_Upload = require("../../../Shares/Middleware/File_Upload");
const Route = Router();
Route.route("/")
  .post(File_Upload.single("image"), PlaceController.CreatePlace)
  .get(PlaceController.GetAllPlaces);
Route.route("/:Id")
  .get(PlaceController.GetPlace)
  .patch(PlaceController.UpdatePlace)
  .delete(PlaceController.DeletePlace);
Route.route("/user/:uid").get(PlaceController.GetPlacesByUserId);
module.exports = Route;
