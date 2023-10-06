const jwt = require("jsonwebtoken");
require("dotenv").config();
const genToken = (found) => {
  const encoded = jwt.sign(
    {
      _id: found._id,
      name: found.name,
      email: found.email,
      isAdmin: found.isAdmin,
    },
    process.env.SECRET_JWT,
    {
      expiresIn: "30d",
    }
  );
  return encoded;
};
module.exports = { genToken };
