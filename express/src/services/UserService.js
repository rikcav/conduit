const userRepository = require("../repositories/UserRepository");

module.exports = {
  findAllUsers: async () => {
    try {
      return await userRepository.findAllUsers();
    } catch (error) {
      throw error;
    }
  },

  createUser: async (data) => {
    try {
      return await userRepository.createUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, data) => {
    try {
      return await userRepository.updateUser(id, data);
    } catch (error) {
      throw error;
    }
  },
};
