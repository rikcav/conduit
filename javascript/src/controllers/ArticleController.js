const articleService = require("../services/ArticleService");
const ArticleDTO = require("../dtos/create/ArticleDTO");

module.exports = {
  createArticle: async (req, res) => {
    try {
      const errors = await ArticleDTO.validate(req.body.article);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const article = await articleService.createArticle(req.body.article, req.userId);
      return res.status(201).send(article);
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

  findAll: async (req, res) => {
    try {
      const articles = await articleService.findAll();
      return res.status(200).send(articles);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
