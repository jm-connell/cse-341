const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

app.use(cors());
app.use(express.json());
app.use("/", require("./routes"));
app.use("/contacts", require("./routes/contacts"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT || 3000, () => {
  console.log("Web Server is listening at port " + (process.env.PORT || 3000));
});
