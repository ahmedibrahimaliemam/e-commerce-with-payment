const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, `data must includes name`],
    },
    email: {
      type: String,
      required: [true, "data must includes email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "data must includes password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = userSchema;
