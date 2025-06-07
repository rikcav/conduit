const { userRoutes } = require("./routes/UserRoutes");
const { tagRoutes } = require("./routes/TagRoutes");
const { articleRoutes } = require("./routes/ArticleRoutes");

module.exports = (app) => {
  userRoutes(app);
  tagRoutes(app);
  articleRoutes(app);
};
