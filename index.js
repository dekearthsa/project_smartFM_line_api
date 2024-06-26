"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controllerDebug_1 = __importDefault(require("./controller/controllerDebug"));
const controllerCreateProfile_1 = __importDefault(require("./controller/controllerCreateProfile"));
const controllerLineAPI_1 = __importDefault(require("./controller/controllerLineAPI"));
const controllerRegister_1 = __importDefault(require("./controller/controllerRegister"));
const controllerOtherReport_1 = __importDefault(require("./controller/controllerOtherReport"));
const controllerLinePush_1 = __importDefault(require("./controller/controllerLinePush"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.get("/api/debug", controllerDebug_1.default);
app.post("/api/debug/createprofile", controllerCreateProfile_1.default);
app.post("/api/line", controllerLineAPI_1.default);
app.post("/api/register", controllerRegister_1.default);
app.post("/api/report/other", controllerOtherReport_1.default);
app.post("/api/line/push", controllerLinePush_1.default);
module.exports.handler = (0, serverless_http_1.default)(app);
// const PORT = 2233 
// app.listen(PORT, () => {
//     console.log(`service haddle backend listen to port: ${PORT}, http://localhost:${PORT}/api/debug`);
// });
