const controller = require("../controllers/CommentController");

module.exports = {
  commentRoutes: (app) => {
    app.get("/api/comments", controller.findAllComments);
  },
};
