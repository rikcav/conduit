const service = require("../services/UserService");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const user = await service.registerUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  },
};
