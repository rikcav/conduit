const userService = require("../services/UserService");

module.exports = {
  findAllUsers: async (req, res) => {
    try {
      const users = await userService.findAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving users", error });
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error creating user", error });
    }
  },

  findUserById: async (req, res) => {
    try {
      const idNumber = parseInt(req.params.id);
      const user = await userService.findUserById(idNumber);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving user", error });
    }
  },

  updateUser: async (req, res) => {
    try {
      const idNumber = parseInt(req.params.id);
      const user = await userService.updateUser(idNumber, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error updating user", error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const idNumber = parseInt(req.params.id);
      const user = await userService.deleteUser(idNumber);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user", error });
    }
  },
};
