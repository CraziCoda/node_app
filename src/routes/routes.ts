import { resolveSoa } from "dns";
import { NextFunction, Router } from "express";
import User from "../config/db";
import { IUser } from "../config/db";
const router = Router();

const isLoggedIn = (req, res, next: NextFunction) => {
  if (req.isAuthenticated()) next();
  else res.send("You need to log");
};

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err: NativeError, result: IUser) => {
    if (err) return console.error(`Error: ${err.name} - ${err.message}`);
    if (result) return res.send("User already exists");
    const user = new User({ username, password, players: [] });
    user.save((err) => {
      if (err) console.error(`Error: ${err.name} - ${err.message}`);
    });

    console.log("User created");
  });
});

router.get("/", isLoggedIn, (req, res) => {
  res.send("Hello There- You are logged in");
});

//route layout -> localhost:3000/add?urname=Jeff
router.post("/add", isLoggedIn, (req, res) => {
  const { player } = req.body;
  const { urname } = req.query;

  User.findOneAndUpdate(
    { username: urname },
    { $push: { players: player } },
    (err: NativeError, result: IUser) => {
      if (err) console.error(`Error: ${err.name} - ${err.message}`);
      if (result) {
        console.log(result);
        res.send("Player added successfully");
        return;
      }
      res.send("Something went wrong");
    }
  );
});

//route layout -> localhost:3000/remove?urname=Jeff
router.post("/remove", isLoggedIn, (req, res) => {
  const { player } = req.body;
  const { urname } = req.query;

  User.findOneAndUpdate(
    { username: urname },
    { $pull: { players: player } },
    (err: NativeError, result: IUser) => {
      if (err) console.error(`Error: ${err.name} - ${err.message}`);
      if (result) {
        res.send("Player Removed successfully");
        return;
      }
      res.send("Something went wrong");
    }
  );
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) console.error(`Error: ${err.name} - ${err.message}`);
    res.send("You have logged out");
  });
});


//localhost:3000/players?urname=Jeff
router.get("/players", isLoggedIn, (req, res) => {
    const { urname } = req.query
  User.findOne({ username: urname }, (err: NativeError, result: IUser) => {
    if (err) return console.error(`Error: ${err.name} - ${err.message}`);
    if(result){
        res.status(200).send(result?.players);
    }
  });
});
export default router;
