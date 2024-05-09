import serverless from 'serverless-http';
import express from "express";
import cors from "cors";

import controllerDebug from "./controller/controllerDebug";
import controllerCreateProfile from "./controller/controllerCreateProfile";
import controllerLineAPI from "./controller/controllerLineAPI";
import controllerRegisterLine from "./controller/controllerRegister";
import controllerOtherReport from "./controller/controllerOtherReport"; 
import controllerLinePush from "./controller/controllerLinePush";

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(cors({origin: '*'}));

app.get("/api/debug", controllerDebug);
app.post("/api/debug/createprofile", controllerCreateProfile)
app.post("/api/line", controllerLineAPI);


app.post("/api/register", controllerRegisterLine);
app.post("/api/report/other", controllerOtherReport);
app.post("/api/line/push", controllerLinePush)


module.exports.handler = serverless(app);
// const PORT = 2233 
// app.listen(PORT, () => {
//     console.log(`service haddle backend listen to port: ${PORT}, http://localhost:${PORT}/api/debug`);
// });
