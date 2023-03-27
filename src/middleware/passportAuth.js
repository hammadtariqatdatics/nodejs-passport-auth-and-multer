const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../../db/models");
const { Person } = db;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const person = await Person.findOne({
          where: {
            email: email,
          },
        });
        if (!person) {
          return done(null, false, "Invalid email or password");
        }

        const isPasswordValid = bcrypt.compareSync(password, person.password);
        if (!isPasswordValid) {
          return done(null, false, "Invalid email or password");
        }

        return done(null, person);
      } catch (error) {
        done(null, false, error);
      }
    }
  )
);
