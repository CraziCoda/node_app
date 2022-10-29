import express from "express";
import session from "express-session";
import passport from "passport";
import passStrategy from "./config/passport";

import auth from "./routes/auth";
import routes from "./routes/routes";

require("./config/set_db");

const app = express();

const PORT: number = parseInt(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "alpe",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passStrategy(passport);

app.use("/auth", auth);
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
