const controller = require("../controllers/ArticleController");
const { authenticateJWT } = require("../controllers/AuthController");

module.exports = {
  articleRoutes: (app) => {
    app.post("/api/articles", authenticateJWT, controller.createArticle);
    app.get("/api/articles", controller.findAll);
    app.get("/api/articles/feed", authenticateJWT, controller.feedArticles);
    app.get("/api/articles/:slug", controller.findBySlug);
    app.put("/api/articles/:slug", authenticateJWT, controller.updateArticle);
    app.delete("/api/articles/:slug", authenticateJWT, controller.deleteArticle);
  },
};
