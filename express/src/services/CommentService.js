const commentService = require("../repositories/CommentRepository");

module.exports = {
  findAllComments: async () => {
    try {
      return await commentService.findAllComments();
    } catch (error) {
      throw error;
    }
  },

  createComment: async (data) => {
    try {
      return await commentService.createComment(data);
    } catch (error) {
      throw error;
    }
  },

  findCommentsByArticleSlug: async (slug) => {
    try {
      return await commentService.findCommentsByArticleSlug(slug);
    } catch (error) {
      throw error;
    }
  },
};
