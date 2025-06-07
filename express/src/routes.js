const { userRoutes } = require("./routes/UserRoutes");
const { tagRoutes } = require("./routes/TagRoutes");

module.exports = (app) => {
  userRoutes(app);
  tagRoutes(app);
};
