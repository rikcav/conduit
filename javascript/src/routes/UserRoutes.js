const controller = require("../controllers/UserController");
const { authenticateJWT } = require("../controllers/AuthController")

module.exports = {
  userRoutes: (app) => {
    app.post("/api/users", controller.registerUser);
    app.post("/api/users/login", controller.loginUser);
    app.get("/api/user", authenticateJWT, controller.getCurrentUser);
  },
};
