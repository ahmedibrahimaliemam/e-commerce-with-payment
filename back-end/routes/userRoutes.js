const {
  getAllUser,
  addUser,
  getUser,
  updateUser,
} = require("../controller/userController");

const routes = require("express").Router();
routes.get("/", getAllUser);
routes.post("/", addUser);
routes.get("/:id", getUser);
routes.patch("/:email",updateUser)
module.exports = routes;
