"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.send("You need to log");
};
router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    db_1.default.findOne({ username }, (err, result) => {
        if (err)
            return console.error(`Error: ${err.name} - ${err.message}`);
        if (result)
            return res.send("User already exists");
        const user = new db_1.default({ username, password, players: [] });
        user.save((err) => {
            if (err)
                console.error(`Error: ${err.name} - ${err.message}`);
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
    db_1.default.findOneAndUpdate({ username: urname }, { $push: { players: player } }, (err, result) => {
        if (err)
            console.error(`Error: ${err.name} - ${err.message}`);
        if (result) {
            console.log(result);
            res.send("Player added successfully");
            return;
        }
        res.send("Something went wrong");
    });
});
//route layout -> localhost:3000/remove?urname=Jeff
router.post("/remove", isLoggedIn, (req, res) => {
    const { player } = req.body;
    const { urname } = req.query;
    db_1.default.findOneAndUpdate({ username: urname }, { $pull: { players: player } }, (err, result) => {
        if (err)
            console.error(`Error: ${err.name} - ${err.message}`);
        if (result) {
            res.send("Player Removed successfully");
            return;
        }
        res.send("Something went wrong");
    });
});
router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err)
            console.error(`Error: ${err.name} - ${err.message}`);
        res.send("You have logged out");
    });
});
//localhost:3000/players?urname=Jeff
router.get("/players", isLoggedIn, (req, res) => {
    const { urname } = req.query;
    db_1.default.findOne({ username: urname }, (err, result) => {
        if (err)
            return console.error(`Error: ${err.name} - ${err.message}`);
        if (result) {
            res.status(200).send(result === null || result === void 0 ? void 0 : result.players);
        }
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map