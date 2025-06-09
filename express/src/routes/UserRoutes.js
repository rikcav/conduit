const controller = require("../controllers/UserController");

module.exports = {
  userRoutes: (app) => {
    app.get("/api/users", controller.findAllUsers);
    app.post("/api/users", controller.createUser);
    app.put("/api/users/:id", controller.updateUser);
  },
};
