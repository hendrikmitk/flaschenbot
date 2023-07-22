"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const articles_1 = __importDefault(require("./routes/articles"));
const combined_1 = __importDefault(require("./routes/combined"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const status_1 = __importDefault(require("./routes/status"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use('/articles', articles_1.default);
app.use('/combined', combined_1.default);
app.use('/favorites', favorites_1.default);
app.use('/status', status_1.default);
app.listen(port, () => {
    console.log(`[SERVER] Server is running at http://localhost:${port}`);
});
