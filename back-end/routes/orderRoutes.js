const orderRoutes = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { isAuthorized } = require("../utility");
const orderModel = require("../model/orderModel");
orderRoutes.post(
  "/",
  isAuthorized,
  expressAsyncHandler(async (req, res, next) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;
    console.log(
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    );
    try {
      const newOrder = new orderModel({
        orderItems: orderItems.map((ele) => {
          return { ...ele /*product: ele._id*/ };
        }),
        shippingAddress,
        paymentMethod,
        itemPrice: itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user._id,
      });
      const data = await newOrder.save();
      res.status(201).send(data);
    } catch (err) {
      console.log(err);
      res.status(501).send({ message: "Internal server error" });
    }
  })
);
//Get all orders
orderRoutes.get(
  "/",
  isAuthorized,
  expressAsyncHandler(async (req, res, next) => {
    try {
      const data = await orderModel.find({});
      if (data) {
        res.status(201).send(data);
      } else {
        res.status(404).send({ message: "No data Found" });
      }
    } catch (err) {
      res.status(500).send({ message: "internal server error" });
    }
  })
);
//delete all items
orderRoutes.delete("/", async (req, res, next) => {
  try {
    await orderModel.deleteMany();
    console.log(`deleted success!`);
  } catch (err) {
    console.log(err);
  }
});
//get a specific order
orderRoutes.get(
  "/:id",
  isAuthorized,
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await orderModel.findOne({ _id: id });
      if (data) {
        res.status(201).send(data);
      } else {
        res.status(404).send({ message: "the id not found" });
      }
    } catch (err) {
      res.status(500).send({ message: "no data found" });
    }
  })
);
orderRoutes.put("/:id/pay", async (req, res, next) => {
  console.log(`put pay`);
  const order = await orderModel.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({ message: "order paid", order: updatedOrder });
  } else {
    res.status(404).send({ message: "the order not found!" });
  }
});
//get order for a specific user
orderRoutes.get(
  "/mine/:id",
  isAuthorized,
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await orderModel.find({ user: id });
      if (data) {
        res.status(201).send(data);
      } else {
        res.status(404).send({ message: "the id not found" });
      }
    } catch (err) {
      res.status(500).send({ message: "no data found" });
    }
  })
);
module.exports = orderRoutes;
