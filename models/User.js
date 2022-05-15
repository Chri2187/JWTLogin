const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 4,
      maxlength: 25,
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
      },
      unique: true,
    },
    pwd: {
      type: String,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
