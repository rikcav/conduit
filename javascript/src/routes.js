const { userRoutes } = require("./routes/UserRoutes");
const { articleRoutes } = require("./routes/ArticleRoutes");

module.exports = (app) => {
  userRoutes(app);
  articleRoutes(app);
};
