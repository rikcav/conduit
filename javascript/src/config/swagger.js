const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Conduit API",
    version: "1.0.0",
    description: "API documentation for the Conduit application",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/api/users": {
      post: {
        summary: "Register a new user",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    properties: {
                      username: { type: "string", example: "john_doe" },
                      email: { type: "string", example: "john@example.com" },
                      password: { type: "string", example: "mypassword123" },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "Invalid input",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
