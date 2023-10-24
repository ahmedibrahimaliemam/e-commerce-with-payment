const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { genToken } = require("../utility");
const expressAsyncHandler = require("express-async-handler");

const routes = require("express").Router();
routes.post(
  "/signIn",
  expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const found = await userModel.findOne({ email });
      if (found && bcrypt.compareSync(password, found.password)) {
        res.json({
          _id: found._id,
          name: found.name,
          email: found.email,
          isAdmin: found.isAdmin,
          token: genToken(found),
        });
      } else {
        res.status(401).send({ message: "Invalid email or password" });
      }
    } catch (err) {
      res.status(500).send({ message: "internal server error!" });
    }
  })
);
module.exports = routes;
