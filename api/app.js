const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config({ path: "./config/secrets.env" });

app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/main"));

app.listen(3001, () => {
  console.log("Running");
});
