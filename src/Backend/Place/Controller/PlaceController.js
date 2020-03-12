const PlaceModel = require("../Model/PlaceModel");
const UserModel = require("../../User/Model/UserModel");
const AsyncWrapper = require("../../Utils/AsyncWrapper");
const AppError = require("../../Utils/AppError");
const fs = require("fs");

exports.CreatePlace = AsyncWrapper(async (req, res, next) => {
  const { title, description, address, creator, image } = req.body;
  const Place = new PlaceModel({
    title,
    description,
    image,
    image: req.file.path,
    address,
    creator
  });
  const User = await UserModel.findById(creator);
  if (!User) {
    return next(new AppError("Opeartion Failed", 500));
  }
  await Place.save();
  User.places.push(Place);
  await User.save();
  res.status(201).json({
    Status: "Success",
    Place
  });
});

exports.GetPlace = AsyncWrapper(async (req, res, next) => {
  const Id = req.params.Id;
  const Place = await PlaceModel.findById(Id);
  if (!Place || Place.length == 0) {
    return next(new AppError(`Unable To Find Place With Id ${Id}`, 404));
  }
  res.status(200).json({
    Status: "Success",
    // getters will allow you to get _id as just id without underscore-
    Place: Place.toObject({ getters: true })
  });
});

exports.GetAllPlaces = AsyncWrapper(async (req, res, next) => {
  const Places = await PlaceModel.find({});
  res.status(200).json({
    Status: "Success",
    Count: Places.length,
    Places: Places.length > 0 ? Places : "No Place To Show"
  });
});

exports.GetPlacesByUserId = AsyncWrapper(async (req, res, next) => {
  const Id = req.params.uid;
  const Places = await UserModel.find({
    _id: Id
  }).populate("places");

  if (!Places || Places.length == 0) {
    return next(
      new AppError("Could Not Found Places With The Given UserId", 404)
    );
  }
  res.status(200).json({
    Status: "Success",
    Count: Places.length,
    Places: Places.length > 0 ? Places : "No Place To Show"
  });
});

exports.UpdatePlace = AsyncWrapper(async (req, res, next) => {
  const Id = req.params.Id;
  const Place = await PlaceModel.findById(Id);
  if (!Place) {
    return next(new AppError("Unable To Find The Place With Provided Id", 404));
  }
  const { title, description } = req.body;

  Place.title = title;
  Place.description = description;
  if (req.userId === Place.creator._id.toString()) {
    await Place.save();
    res.status(200).json({
      Status: "Success",
      Place
    });
  } else {
    return next(new AppError("You Are Not Authorized For This Action", 401));
  }
});

exports.DeletePlace = AsyncWrapper(async (req, res, next) => {
  const Id = req.params.Id;
  const Place = await PlaceModel.findById(Id).populate("creator");
  if (!Place) {
    return next(new AppError("Unable To Find The Place With Provided Id", 404));
  }
  if (req.userId === Place.creator._id.toString()) {
    await Place.remove();
    Place.creator.places.pull(Place);
    await Place.creator.save();
    // It Will Delete The Picure Of Image From Static Folder-
    fs.unlink(Place.image, err => {});
    res.status(200).json({
      Status: "Sucess",
      Message: "Deleted Item With Id " + Id + " Has Been Deleted :)"
    });
  } else {
    return next(new AppError("You Are Not Authorized For This Action", 401));
  }
});
