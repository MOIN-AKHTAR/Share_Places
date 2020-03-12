const Mongoose = require("mongoose");
const Bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
// const validator = require("validator");
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
    unique: [true, "Please Provide Unique Email"]
    // ,validate: [validator.isEmail, "Please Provide Correct Email"]
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

// Instance Based Method-
userSchema.methods.decryptPassword = async (password, hashedPassword) => {
  return await Bcryptjs.compare(password, hashedPassword);
};
userSchema.methods.generateToken = Id =>
  JWT.sign({ Id }, "MY_SUPER_SECRET_KEY", { expiresIn: "1h" });
// Pre Hook
userSchema.pre("save", async function(next) {
  // If Password Is Not Modified We Will Go Ahead Without Hashing The Password-
  if (!this.isModified("password")) return next();
  // If Password Is Created Or Modified Then We Must Have To Hash The Password-
  this.password = await Bcryptjs.hash(this.password, 12);
  next();
});

module.exports = Mongoose.model("User", userSchema);
