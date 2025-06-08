const articleRepository = require("../repositories/ArticleRepository");

module.exports = {
  findAllArticles: async () => {
    try {
      return await articleRepository.findAllArticles();
    } catch (error) {
      throw error;
    }
  },

  createArticle: async (data) => {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { tagList = [], ...articleData } = data;

    const normalizedTagList = tagList.map((tag) =>
      tag
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .trim()
    );

    return await articleRepository.createArticle({
      ...articleData,
      slug,
      tagList: normalizedTagList,
    });
  },

  findArticleBySlug: async (slug) => {
    try {
      return await articleRepository.findArticleBySlug(slug);
    } catch (error) {
      throw error;
    }
  },

  updateArticle: async (slug, data) => {
    const { tagList = [], ...articleData } = data;

    const normalizedTagList = tagList.map((tag) =>
      tag
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .trim()
    );

    return await articleRepository.updateArticle(slug, {
      ...articleData,
      tagList: normalizedTagList,
    });
  },

  deleteArticle: async (slug) => {
    try {
      return await articleRepository.deleteArticle(slug);
    } catch (error) {
      throw error;
    }
  },

  favoriteArticle: async (slug) => {
    try {
      return await articleRepository.favoriteArticle(slug);
    } catch (error) {
      throw error;
    }
  },

  unfavoriteArticle: async (slug) => {
    try {
      return await articleRepository.unfavoriteArticle(slug);
    } catch (error) {
      throw error;
    }
  },
};
