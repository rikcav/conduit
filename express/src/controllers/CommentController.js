const commentService = require("../services/CommentService");

module.exports = {
  findCommentsByArticle: async (req, res) => {
    try {
      const slug = req.params.slug;
      const comments = await commentService.findCommentsByArticle(slug);
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createComment: async (req, res) => {
    try {
      const slug = req.params.slug;
      const { body, authorId } = req.body;

      if (!body || !authorId) {
        return res
          .status(400)
          .json({ error: "Body and authorId are required." });
      }

      const commentData = { body, authorId };
      const newComment = await commentService.createComment(slug, commentData);
      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const slug = req.params.slug;

      const deletedComment = await commentService.deleteComment(slug, id);

      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.status(204).send();
    } catch (error) {
      if (error.message === "Article not found") {
        return res.status(404).json({ error: "Article not found" });
      }
      return res.status(500).json({ error: error.message });
    }
  },
};
