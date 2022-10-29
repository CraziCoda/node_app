"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
}));
exports.default = router;
//# sourceMappingURL=auth.js.map