const commentRepository = require("../repositories/CommentRepository");

module.exports = {
  findAllComments: async () => {
    try {
      return await commentRepository.findAllComments();
    } catch (error) {
      throw error;
    }
  },

  createComment: async (data) => {
    try {
      return await commentRepository.createComment(data);
    } catch (error) {
      throw error;
    }
  },

  findCommentsByArticleSlug: async (slug) => {
    try {
      return await commentRepository.findCommentsByArticleSlug(slug);
    } catch (error) {
      throw error;
    }
  },

  findCommentById: async (id) => {
    try {
      return await commentRepository.findCommentById(id);
    } catch (error) {
      throw error;
    }
  },

  updateComment: async (id, data) => {
    try {
      return await commentRepository.updateComment(id, data);
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (id) => {
    try {
      return await commentRepository.deleteComment(id);
    } catch (error) {
      throw error;
    }
  },
};
