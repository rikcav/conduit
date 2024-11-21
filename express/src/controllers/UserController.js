const userService = require("../services/UserService");
const UserRegisterDTO = require("../dtos/create/UserRegisterDTO");
const UserLoginDTO = require("../dtos/create/UserLoginDTO");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const errors = await UserRegisterDTO.validate(req.body.user);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      req.body.user.password = await bcrypt.hash(req.body.user.password, 10);

      const user = await userService.registerUser(req.body.user);
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);

      if (error.message.includes("Duplicate")) {
        return res.status(409).send({ errors: error.message });
      }

      return res
        .status(500)
        .send({ message: "Internal Server Error: " + error });
    }
  },

  loginUser: async (req, res) => {
    try {
      const errors = await UserLoginDTO.validate(req.body.user);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const { email, password } = req.body.user;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await userService.findUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "1h" });
      return res.json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await userService.findUserById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({ id: user.id, email: user.email, username: user.username, bio: user.bio, image: user.image });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
