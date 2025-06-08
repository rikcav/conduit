const controller = require("../controllers/CommentController");

module.exports = {
  commentRoutes: (app) => {
    app.get("/api/comments", controller.findAllComments);
    // app.post("/api/articles/:slug/comments", controller.createComment);
    app.get(
      "/api/articles/:slug/comments",
      controller.findCommentsByArticleSlug
    );
  },
};
