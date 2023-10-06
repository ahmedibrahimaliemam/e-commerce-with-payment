const {
  getAllUser,
  addUser,
  getUser,
} = require("../controller/userController");

const routes = require("express").Router();
routes.get("/", getAllUser);
routes.post("/", addUser);
routes.get("/:id", getUser);
module.exports = routes;
