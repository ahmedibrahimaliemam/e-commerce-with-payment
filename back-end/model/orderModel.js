const orderSchema = require("../schema/orderSchema");

const orderModel = require("mongoose").model("order", orderSchema);
module.exports = orderModel;
