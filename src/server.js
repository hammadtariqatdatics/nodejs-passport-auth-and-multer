const express = require("express");
const routes = require("./routes");
const cors = require("cors");
require("./middleware/passportAuth");
// const passportAuth = require("./middleware/passportAuth")();
// const passport = require("passport");
// const localStrategy = require("passport-local");
// const db = require("../db/models");
// const { Person } = db;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(passportAuth.initialize());

// Simple Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

// Passport Config
// passport.use(new localStrategy(passportAuth.authenticate()));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(Person.serializeUser());
// passport.deserializeUser(Person.deserializeUser());

// app.use("/customers", router);
app.use("/api", routes);

app.listen(5000, () => console.log("App is listening at port 5000"));
