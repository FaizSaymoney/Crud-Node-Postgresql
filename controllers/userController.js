const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.createUser(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  // Build update object with only provided fields
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (email !== undefined) updateFields.email = email;
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }
  try {
    const user = await userModel.updateUser(id, updateFields);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.deleteUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
