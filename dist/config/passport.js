"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const db_1 = __importDefault(require("./db"));
const LocalStrategy = passport_local_1.Strategy;
exports.default = (passport) => {
    passport.use(new LocalStrategy((user, password, done) => {
        db_1.default.findOne({ username: user }, (err, result) => {
            if (err)
                return done(err, null);
            if ((result === null || result === void 0 ? void 0 : result.password) == password)
                return done(null, { name: result === null || result === void 0 ? void 0 : result.username });
            done(null, false);
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log(user);
        done(null, user);
    });
};
//# sourceMappingURL=passport.js.map