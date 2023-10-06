const mongoose = require("mongoose");
require("dotenv").config();
const main = async () => {
  await mongoose
    .connect(process.env.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`mongo connection success`))
    .catch((err) => console.log(err));
};
module.exports = main;
