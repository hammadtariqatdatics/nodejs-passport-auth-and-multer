const express = require("express");
const routes = require("./routes");
const cors = require("cors");
require("./middleware/passportAuth");

const app = express();
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/api", routes);

app.listen(5000, () => console.log("App is listening at port 5000"));
