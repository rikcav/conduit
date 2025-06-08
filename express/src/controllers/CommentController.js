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
};
