const express = require("express");
const cors = require("cors");
const app = express();
const main = require("./connectDB/connectDB");
const routes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const userSignRoutes = require("./routes/userSign");
const port = process.env.PORT || 5000;
//middelware
app.use(express.json());
//to parse the header token
app.use(express.urlencoded({extended:true})) ;
app.use(cors());
app.use(`/products/api`, routes);
app.use(`/users/api`, userRoutes);
app.use(`/users/api`, userSignRoutes);
main();
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
