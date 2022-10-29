"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const routes_1 = __importDefault(require("./routes/routes"));
require("./config/set_db");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT) || 3000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: "alpe",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.default)(passport_1.default);
app.use("/auth", auth_1.default);
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
//# sourceMappingURL=index.js.map