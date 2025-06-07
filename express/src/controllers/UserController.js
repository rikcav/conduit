const userService = require("../services/UserService");
const UserRegisterDTO = require("../dtos/create/UserRegisterDTO");
const bcrypt = require("bcryptjs");

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
};
