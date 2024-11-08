const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const setupSwagger = require("./config/swagger");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("Swagger docs are available on http://localhost:3000/api-docs");
});
