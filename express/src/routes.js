const { userRoutes } = require("./routes/UserRoutes");
const { tagRoutes } = require("./routes/TagRoutes");
const { articleRoutes } = require("./routes/ArticleRoutes");
const { commentRoutes } = require("./routes/CommentRoutes");

module.exports = (app) => {
  userRoutes(app);
  tagRoutes(app);
  articleRoutes(app);
  commentRoutes(app);
};
