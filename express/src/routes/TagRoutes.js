const controller = require("../controllers/TagController");

module.exports = {
  tagRoutes: (app) => {
    app.get("/api/tags", controller.findAllTags);
  },
};
