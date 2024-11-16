const userRepository = require("../repositories/UserRepository");

module.exports = {
  registerUser: async (data) => {
    try {
      return await userRepository.registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        bio: data.bio,
        image: data.image,
      });
    } catch (error) {
      if (error.code === "P2002") {
        const duplicateField = error.meta.target[0];
        throw new Error(
          `Duplicate ${duplicateField}: This ${duplicateField} is already taken.`
        );
      }

      throw error;
    }
  },

  findUserByEmail: async (email) => {
    try {
      return await userRepository.findUserByEmail(email);
    } catch (error) {
      throw error;
    }
  },

  findUserById: async (id) => {
    try {
      return await userRepository.findUserById(id);
    } catch (error) {
      throw error;
    }
  },
};
