const productsModel = require("../model/productsModel");
// method to add product
const addProduct = async (req, res, next) => {
  //   const {
  //     name,
  //     slug,
  //     image,
  //     brand,
  //     category,
  //     description,
  //     price,
  //     countInStock,
  //     rating,
  //     numReviews,
  //   } = req.body;
  const { products } = req.body;
  try {
    const data = await productsModel.insertMany(products);
    res.json({ data });
  } catch (err) {
    res.json({ message: `error` });
  }
};
//method to get all products
const getAllProducts = async (req, res, next) => {
  try {
    const data = await productsModel.find({});
    if (data) {
      res.json({ data });
    } else {
      res
        .status(404)
        .send(`<h1  style="text-align:center">product not found</h1>`);
    }
  } catch (err) {
    res
      .status(500)
      .send(`<h1  style="text-align:center">internal server error</h1>`);
  }
};
//get a specific product by id
const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productsModel.findById(id);
    if (product) {
      res.json({ data: product });
    } else {
      res.status(404).send(`<h1 style="text-align:center">product not found</h1>`);
    }
  } catch (err) {
    res
      .status(500)
      .send(`<h1  style="text-align:center">internal server error</h1>`);
  }
};
//fnd by slug
const findBySlug=async(req,res,next)=>{
    const {slug}=req.params ;
      try {
        const product = await productsModel.find({slug})
        if (product) {
          res.json({ data: product });
        } else {
          res
            .status(404)
            .send(`<h1 style="text-align:center">product not found</h1>`);
        }
      } catch (err) {
        res
          .status(500)
          .send(`<h1  style="text-align:center">internal server error</h1>`);
      }
}
module.exports = { addProduct, getAllProducts, getProduct ,findBySlug };
