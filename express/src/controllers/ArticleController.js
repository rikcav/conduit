const articleService = require("../services/ArticleService");

module.exports = {
  findAllArticles: async (req, res) => {
    try {
      const articles = await articleService.findAllArticles();
      return res.status(200).json(articles);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving articles", error });
    }
  },

  // createArticle: async (req, res) => {
  //   try {
  //     const article = await articleService.createArticle(req.body);
  //     return res.status(201).json(article);
  //   } catch (error) {
  //     return res.status(500).json({ message: "Error creating article", error });
  //   }
  // },

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
        .json({ message: "Error retrieving article", error });
    }
  },

  // updateArticle: async (req, res) => {
  //   try {
  //     const slug = req.params.slug;
  //     const article = await articleService.updateArticle(slug, req.body);
  //     if (!article) {
  //       return res.status(404).json({ message: "Article not found" });
  //     }
  //     return res.status(200).json(article);
  //   } catch (error) {
  //     return res.status(500).json({ message: "Error updating article", error });
  //   }
  // },

  deleteArticle: async (req, res) => {
    try {
      const slug = req.params.slug;
      const article = await articleService.deleteArticle(slug);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting article", error });
    }
  },
};
