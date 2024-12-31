import User from "../models/user.model.js";

const makeUser = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.create({ name, password });

  res.status(201).json({ user });
};

export default makeUser;
