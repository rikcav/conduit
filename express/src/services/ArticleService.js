const articleRepository = require("../repositories/ArticleRepository");

module.exports = {
  findAllArticles: async () => {
    try {
      return await articleRepository.findAllArticles();
    } catch (error) {
      throw error;
    }
  },

  // createArticle: async (data) => {
  //   try {
  //     return await articleRepository.createArticle({
  //       title: data.title,
  //       content: data.content,
  //       authorId: data.authorId,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // },

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
