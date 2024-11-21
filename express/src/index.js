const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const routes = require("./routes");

dotenv.config();
app.use(cors());
app.use(express.json());
routes(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
