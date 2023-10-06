const {
  addProduct,
  getAllProducts,
  getProduct,
  findBySlug,
} = require("../controller/productsController");
const routes = require("express").Router();
routes.post("/", addProduct);
routes.get("/", getAllProducts);
routes.get("/:id", getProduct);
routes.get("/slug/:slug", findBySlug);
module.exports = routes;
