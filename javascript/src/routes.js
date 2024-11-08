const { userRoutes } = require("./routes/userRoutes");

module.exports = (app) => {
  userRoutes(app);
};
