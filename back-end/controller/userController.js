const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { genToken } = require("../utility");
//add new user
const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    console.log(findUser);
    if (!findUser) {
      if (name && email && password) {
        const newPassword = bcrypt.hashSync(password);
        const data = new userModel({ name, email, password: newPassword });
        await data.save();
        res.json(data);
      } else {
        res.status(400).json({ message: "invalid data!" });
      }
    } else {
      res.status(401).send({ message: "the email is already exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server errorrrrr" });
  }
};
//get all user
const getAllUser = async (req, res, next) => {
  try {
    const data = await userModel.find({});
    if (data) {
      res.json({ data });
    } else {
      res.status(404).json({ message: "no data found" });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error!" });
  }
};
//get a spesific user
const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = userModel.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "no data found" });
    }
  } catch (err) {
    res.status(500).status({ message: "internal server error" });
  }
};
const updateUser = async (req, res, next) => {
  const { email } = req.params;
  const { name, newEmail, password } = req.body;
  const newPassword = bcrypt.hashSync(password, 8);
  try {
    const thisUser = await userModel.findOne({ email });
    if (thisUser) {
      await userModel.updateOne(
        { email },
        { $set: { name, email: newEmail, password: newPassword } }
      );
      const data = await userModel.findOne({ email: newEmail });
      console.log(data);
      res.status(201).send({
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: genToken(data),
      });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "internal server error!" });
  }
};
module.exports = { getAllUser, addUser, getUser, updateUser };
