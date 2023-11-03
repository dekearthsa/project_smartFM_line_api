const express = require("express");
const cors = require("cors");

const {controllerDebug} = require("../controller/controllerDebug");
const {controllerCreateProfile} = require("../controller/controllerCreateProfile");
const {controllerLineAPI} = require("../controller/controllerLineAPI");
const {controllerRegisterLine} = require("../controller/controllerRegister");
const {controllerOtherReport} = require("../controller/controllerOtherReport"); 


const app = express();
app.use(express.urlencoded({extends:true}));
app.use(express.json());
app.use(cors({origin: '*'}));

app.get("/api/debug", controllerDebug);
app.post("/api/debug/createprofile", controllerCreateProfile)
app.post("/api/line", controllerLineAPI);
app.post("/api/register", controllerRegisterLine);
app.post("/api/report/other", controllerOtherReport);

export {app}