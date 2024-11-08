const { userRoutes } = require("./routes/UserRoutes");

module.exports = (app) => {
  userRoutes(app);
};
