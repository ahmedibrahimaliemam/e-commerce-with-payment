const express = require("express");
const cors = require("cors");
const app = express();
const main = require("./connectDB/connectDB");
const routes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const userSignRoutes = require("./routes/userSign");
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");
const port = process.env.PORT || 5000;
//middelware
app.use(express.json());
//to parse the header token
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(`/products/api`, routes);
app.use(`/users/api`, userRoutes);
app.use(`/users/api`, userSignRoutes);
app.use("/order/api", orderRoutes);
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
main();
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/front-end/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/front-end/dist/index.html"));
// });
//handle error
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
