const controller = require("../controllers/CommentController");

module.exports = {
  commentRoutes: (app) => {
    app.get("/api/articles/:slug/comments", controller.findCommentsByArticle);
    app.post("/api/articles/:slug/comments", controller.createComment);
    app.delete("/api/articles/:slug/comments/:id", controller.deleteComment);
  },
};
