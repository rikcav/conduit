const tagRepository = require("../repositories/TagRepository");

module.exports = {
  findAllTags: async () => {
    try {
      return await tagRepository.findAllTags();
    } catch (error) {
      throw error;
    }
  },

  createTag: async (data) => {
    try {
      return await tagRepository.createTag({
        name: data.name,
      });
    } catch (error) {
      throw error;
    }
  },
};
