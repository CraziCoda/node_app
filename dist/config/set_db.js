"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uri = process.env.DB_URL || "mongodb://localhost:27017/test";
(0, mongoose_1.connect)(uri, (err) => {
    if (err)
        return console.log(`Error: ${err.name} - ${err.message}`);
    console.log(`Database connected`);
});
//# sourceMappingURL=set_db.js.map