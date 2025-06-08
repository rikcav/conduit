const controller = require("../controllers/CommentController");

module.exports = {
  commentRoutes: (app) => {
    app.get("/api/comments", controller.findAllComments);
    // app.post("/api/articles/:slug/comments", controller.createComment);
    app.get(
      "/api/articles/:slug/comments",
      controller.findCommentsByArticleSlug
    );
    app.get("/api/comments/:id", controller.findCommentById);
    app.put("/api/comments/:id", controller.updateComment);
    app.delete("/api/comments/:id", controller.deleteComment);
  },
};
