const commentRepository = require("../repositories/CommentRepository");
const articleRepository = require("../repositories/ArticleRepository");

module.exports = {
  findCommentsByArticle: async (slug) => {
    try {
      return await commentRepository.findCommentsByArticle(slug);
    } catch (error) {
      throw error;
    }
  },

  createComment: async (slug, data) => {
    try {
      const articleId = await articleRepository.findArticleIdBySlug(slug);
      if (!articleId) {
        throw new Error(`Article with slug '${slug}' not found`);
      }

      const commentData = {
        ...data,
        articleId,
      };

      return await commentRepository.createComment(commentData);
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (slug, id) => {
    try {
      const article = await articleRepository.findArticleBySlug(slug);
      if (!article) {
        throw new Error("Article not found");
      }

      return await commentRepository.deleteComment(id);
    } catch (error) {
      throw error;
    }
  },
};
