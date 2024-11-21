const controller = require("../controllers/ArticleController");
const { authenticateJWT } = require("../controllers/AuthController");

module.exports = {
  articleRoutes: (app) => {
    app.post("/api/articles", authenticateJWT, controller.createArticle);
    app.get("/api/articles", controller.findAll);
    app.get("/api/articles/:slug", controller.findBySlug);
  },
};
