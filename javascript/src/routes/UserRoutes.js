const controller = require("../controllers/UserController");

module.exports = {
  userRoutes: (app) => {
    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Register a new user
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user:
     *                 type: object
     *                 properties:
     *                   username:
     *                     type: string
     *                     description: The user's username
     *                     example: "john_doe"
     *                   email:
     *                     type: string
     *                     description: The user's email
     *                     example: "john@example.com"
     *                   password:
     *                     type: string
     *                     description: The user's password
     *                     example: "mypassword123"
     *     responses:
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: Invalid input
     *       500:
     *         description: Internal server error
     */
    app.post("/api/users", controller.registerUser);
  },
};
