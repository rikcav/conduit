const repository = require("../repositories/userRepository");

module.exports = {
  registerUser: async (data) => {
    try {
      return await repository.registerUser(data);
    } catch (error) {
      throw error;
    }
  },
};
