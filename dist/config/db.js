"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    players: { type: [String] },
});
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
//# sourceMappingURL=db.js.map