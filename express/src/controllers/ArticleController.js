const articleService = require("../services/ArticleService");
const ArticleDTO = require("../dtos/create/ArticleDTO");
const { findBySlug } = require("../repositories/ArticleRepository");

module.exports = {
  createArticle: async (req, res) => {
    try {
      const errors = await ArticleDTO.validate(req.body.article);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const article = await articleService.createArticle(
        req.body.article,
        req.userId
      );
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

  findBySlug: async (req, res) => {
    try {
      const slug = req.params.slug;
      const article = await articleService.findBySlug(slug);
      console.log(article);
      return res.status(200).send(article);
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ errors: "Could not find article with slug: " + slug });
    }
  },
  feedArticles: async (req, res) => {
    try {
      const { limit = 20, offset = 0 } = req.query;
      const userId = req.userId;

      const articles = await articleService.feedArticles(
        userId,
        parseInt(limit),
        parseInt(offset)
      );
      return res.status(200).send(articles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  updateArticle: async (req, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId;

      const updatedArticle = await articleService.updateArticle(
        slug,
        req.body.article,
        userId
      );
      return res.status(200).send(updatedArticle);
    } catch (error) {
      console.error(error);

      if (error.message === "Unauthorized") {
        return res
          .status(403)
          .send({ error: "You are not authorized to update this article." });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteArticle: async (req, res) => {
    try {
      const { slug } = req.params;
      const userId = req.userId;

      await articleService.deleteArticle(slug, userId);
      return res.status(204).send();
    } catch (error) {
      console.error(error);

      if (error.message === "Unauthorized") {
        return res
          .status(403)
          .send({ error: "You are not authorized to delete this article." });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
