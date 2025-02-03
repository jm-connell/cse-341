const swaggerAutogen = require("swagger-autogen")();

const isProduction = process.env.NODE_ENV === "production";

const doc = {
  info: {
    title: "My API",
    description: "CSE341 API",
  },
  host: isProduction ? "https://cse-341-rgdc.onrender.com" : "localhost:3000",
  schemes: isProduction ? ["https"] : ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js", "./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
