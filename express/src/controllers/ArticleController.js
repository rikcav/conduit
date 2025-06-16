const articleService = require("../services/ArticleService");

module.exports = {
  findAllArticles: async (req, res) => {
    try {
      const articles = await articleService.findAllArticles();
      return res.status(200).json(articles);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving articles", error: error.message });
    }
  },

  createArticle: async (req, res) => {
    try {
      const { title, description, body, tagList, authorId } = req.body;
      if (!title || !description || !body || !authorId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const data = await articleService.createArticle({
        title,
        description,
        body,
        tagList,
        authorId,
      });

      return res.status(201).json(data);
    } catch (error) {
      if (error.code === "23505" || error.message.includes("already exists")) {
        return res
          .status(409)
          .json({ message: "Article with this title or slug already exists" });
      }

      return res
        .status(500)
        .json({ message: "Error creating article", error: error.message });
    }
  },

  findArticleBySlug: async (req, res) => {
    try {
      const slug = req.params.slug;
      const article = await articleService.findArticleBySlug(slug);

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      return res.status(200).json(article);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving article", error: error.message });
    }
  },

  updateArticle: async (req, res) => {
    try {
      const slug = req.params.slug;
      const updated = await articleService.updateArticle(slug, req.body);

      if (!updated) {
        return res.status(404).json({ message: "Article not found" });
      }

      return res.status(200).json(updated);
    } catch (error) {
      if (error.code === "23505" || error.message.includes("already exists")) {
        return res
          .status(409)
          .json({ message: "Article with this title or slug already exists" });
      }

      return res
        .status(500)
        .json({ message: "Error updating article", error: error.message });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const slug = req.params.slug;
      const deleted = await articleService.deleteArticle(slug);

      if (!deleted) {
        return res.status(404).json({ message: "Article not found" });
      }

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting article", error: error.message });
    }
  },

  favoriteArticle: async (req, res) => {
    try {
      const slug = req.params.slug;
      const article = await articleService.favoriteArticle(slug);

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      return res.status(200).json(article);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error favoriting article", error: error.message });
    }
  },

  unfavoriteArticle: async (req, res) => {
    try {
      const slug = req.params.slug;
      const article = await articleService.unfavoriteArticle(slug);

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      return res.status(200).json(article);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error unfavoriting article", error: error.message });
    }
  },
};
