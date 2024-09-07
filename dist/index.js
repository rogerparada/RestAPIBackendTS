"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
server_1.default.listen(PORT, () => {
    // console.log(`The server is running on  http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map