const Mongoose = require("mongoose");
const Validator = require("validator");
const Schema = Mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Provide User Name"],
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    unique: [true, "Please Provide Unique Email"],
    validate: [Validator.isEmail, "Please Provide Correct Email"]
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: [6, "Must Have At Least 6 Characters"]
  },
  image: {
    type: String,
    default: "No Image"
  },
  places: [
    {
      type: Mongoose.Types.ObjectId,
      ref: "Place",
      default: []
    }
  ]
});
module.exports = Mongoose.model("User", userSchema);
