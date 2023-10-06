const mongoose = require("mongoose");
const productsSchema = require("../schema/productSchema");

const productsModel = mongoose.model("products", productsSchema);
module.exports = productsModel;
