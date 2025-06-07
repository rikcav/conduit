const tagService = require("../services/TagService");

module.exports = {
  findAllTags: async (req, res) => {
    try {
      const tags = await tagService.findAllTags();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving tags", error });
    }
  },
};
