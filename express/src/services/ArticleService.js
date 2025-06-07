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

    return await articleRepository.createArticle({
      ...articleData,
      slug,
      tagList,
    });
  },

  findArticleBySlug: async (slug) => {
    try {
      return await articleRepository.findArticleBySlug(slug);
    } catch (error) {
      throw error;
    }
  },

  // updateArticle: async (slug, data) => {
  //   try {
  //     return await articleRepository.updateArticle(slug, data);
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  deleteArticle: async (slug) => {
    try {
      return await articleRepository.deleteArticle(slug);
    } catch (error) {
      throw error;
    }
  },
};
