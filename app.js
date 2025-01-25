const express = require("express");
const app = express();

app.use(express.json());
app.use("/", require("./routes"));
app.use("/contacts", require("./routes/contacts"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Web Server is listening at port " + (process.env.PORT || 3000));
});
