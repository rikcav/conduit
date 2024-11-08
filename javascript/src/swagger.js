const swaggerAutogen = require("swagger-autogen");

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./user/routes.js"];

swaggerAutogen(outputFile, endpointsFiles);
