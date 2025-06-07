const controller = require("../controllers/UserController");

module.exports = {
  userRoutes: (app) => {
    app.get("/api/users", controller.findAllUsers);
    app.post("/api/users", controller.createUser);
    app.get("/api/users/:id", controller.findUserById);
    app.put("/api/users/:id", controller.updateUser);
    app.delete("/api/users/:id", controller.deleteUser);
  },
};
