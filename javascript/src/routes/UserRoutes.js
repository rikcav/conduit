const controller = require("../controllers/UserController");

module.exports = {
  userRoutes: (app) => {
    app.post("/api/users", controller.registerUser);
  },
};
