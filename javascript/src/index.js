const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const setupSwagger = require("./config/swagger");
const app = express();
const routes = require("./routes");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes(app);
// setupSwagger(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("Swagger docs are available on http://localhost:3000/api-docs");
});
