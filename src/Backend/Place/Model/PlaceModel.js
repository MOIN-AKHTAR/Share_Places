const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const placeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Provide Title Of The Place"],
    unique: [true, "Title Of Place Should Be Unique"],
    trim: true
  },
  description: {
    type: String,
    default: "No Description",
    trim: true
  },
  image: {
    type: String,
    default: "No Image Yet"
  },
  address: {
    type: String,
    required: [true, "Please Provide Title Of The Place"],
    trim: true
  },
  creator: {
    type: Mongoose.Types.ObjectId,
    required: [true, "Place Must Have A Creator"],
    ref: "User"
  }
});

module.exports = Mongoose.model("Place", placeSchema);
