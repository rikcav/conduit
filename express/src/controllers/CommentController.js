const commentService = require("../services/CommentService");

module.exports = {
  findAllComments: async (req, res) => {
    try {
      const comments = await commentService.findAllComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // createComment: async (req, res) => {
  //   try {
  //     const { slug } = req.params;
  //     const commentData = {
  //       ...req.body.comment,
  //       articleSlug: slug,
  //       authorId: req.user.id,
  //     };
  //     const comment = await commentService.createComment(commentData);
  //     res.status(201).json({ comment });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  findCommentsByArticleSlug: async (req, res) => {
    try {
      const slug = req.params.slug;
      const comments = await commentService.findCommentsByArticleSlug(slug);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findCommentById: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const comment = await commentService.findCommentById(id);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updatedComment = await commentService.updateComment(id, req.body);
      if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deletedComment = await commentService.deleteComment(id);
      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
