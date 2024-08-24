"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.router);
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
