const controller = require("../controllers/userController");

module.exports = {
  userRoutes: (app) => {
    app.post("/api/users", controller.registerUser);
  },
};
