const controller = require("../controllers/ArticleController");

module.exports = {
  articleRoutes: (app) => {
    app.get("/api/articles", controller.findAllArticles);
    app.post('/api/articles', controller.createArticle);
    app.get("/api/articles/:slug", controller.findArticleBySlug);
    // app.put('/api/articles/:slug', controller.updateArticle);
    app.delete("/api/articles/:slug", controller.deleteArticle);
  },
};
