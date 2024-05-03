"use strict";
const serverless = require('serverless-http');
const express = require("express");
const cors = require("cors");
const { controllerDebug } = require("./controller/controllerDebug");
const { controllerCreateProfile } = require("./controller/controllerCreateProfile");
const { controllerLineAPI } = require("./controller/controllerLineAPI");
const { controllerRegisterLine } = require("./controller/controllerRegister");
const { controllerOtherReport } = require("./controller/controllerOtherReport");
const { controllerLinePush } = require("./controller/controllerLinePush");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.get("/api/debug", controllerDebug);
app.post("/api/debug/createprofile", controllerCreateProfile);
app.post("/api/line", controllerLineAPI);
app.post("/api/register", controllerRegisterLine);
app.post("/api/report/other", controllerOtherReport);
app.post("/api/line/push", controllerLinePush);
module.exports.handler = serverless(app);
// const PORT =  2233;
// app.listen(PORT, () => {
//     console.log(`service haddle backend listen to port: ${PORT}, http://localhost:${PORT}/api/debug`);
// });
