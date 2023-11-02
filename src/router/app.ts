const express = require("express");
const cors = require("cors");

const {controllerDebug} = require("../controller/controllerDebug");
const {controllerCreateProfile} = require("../controller/controllerCreateProfile");
const {controllerLineAPI} = require("../controller/controllerLineAPI");

const app = express();
app.use(express.urlencoded({extends:true}));
app.use(express.json());
app.use(cors({origin: '*'}));

app.get("/api/debug", controllerDebug);
app.post("/api/debug/createprofile", controllerCreateProfile)
app.post("/api/line", controllerLineAPI);

export {app}