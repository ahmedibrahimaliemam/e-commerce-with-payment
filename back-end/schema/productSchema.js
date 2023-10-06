const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, `data must includes name`],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, `data must includes slug`],
      unique: true,
    },
    image: {
      type: String,
      require: [true, `data must includes image url`],
    },
    brand: {
      type: String,
      required: [true, `data must includes product brand`],
    },
    category: {
      type: String,
      required: [true, `data must includes product category`],
    },
    description: {
      type: String,
      require: [true, `data must includes product description`],
    },
    price: {
      type: Number,
      require: [true, `data must includes product price`],
    },
    countInStock: {
      type: Number,
      require: [true, `data must includes product countInStock`],
    },
    rating: {
      type: Number,
      require: [true, `data must includes product rating`],
    },
    numReviews: {
      type: Number,
      require: [true, `data must includes product numReview`],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = productsSchema;
