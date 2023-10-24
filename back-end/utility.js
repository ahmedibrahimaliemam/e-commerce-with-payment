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
const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7); //Bearer $$$$$
    console.log(token);
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};
module.exports = { genToken, isAuthorized };
