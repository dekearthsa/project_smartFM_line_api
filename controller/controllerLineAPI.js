"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_sdk_1 = __importDefault(require("@line/bot-sdk"));
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const airfac_solar_1 = __importDefault(require("../struct/airfac_solar"));
const airfac_1 = __importDefault(require("../struct/airfac"));
const solar_1 = __importDefault(require("../struct/solar"));
const flexRegisster_1 = __importDefault(require("../struct/flexRegisster"));
const flexAirFactory_1 = __importDefault(require("../struct/flexAirFactory"));
const flexSolarRoof_1 = __importDefault(require("../struct/flexSolarRoof"));
const CHANNEL_SECRET = "a123dfdce669ad6868727b47f64415ad";
const CHANNEL_ACCESS_TOKEN = "lqHG6mhwJDMus7YLEZbXXRcQsBMSr3gaJCSwIKVBJgc/5jfCit8goM8Gu0RDCzIYsicBN1BdL+RqBkhFsDSQ+e8zwo6UTn2T35zIBwcAVT5tgu9rnu4QeTjnMCpFibp9D8aU8KR19JM0IVX9Nf9NfAdB04t89/1O/w1cDnyilFU=";
const KIND_COLLECTION = "demo_user_line_id";
const KIND_REPORT = "demo_user_line_report";
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const CONFIG = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
};
const LINE_CLIENT = new bot_sdk_1.Client(CONFIG);
function controllerLineAPI(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const MSG_TYPE = body.events[0].message.type;
        const REPLY_TOKEN = req.body.events[0].replyToken;
        // const USER_TYPE = req.body.events[0].source.type;
        const USER_ID = req.body.events[0].source.userId;
        const MSG_IN = body.events[0].message.text;
        const date = new Date();
        const ms = date.getTime();
        // const {MSG_TYPE, MSG_IN, USER_ID} = req.body; 
        if (MSG_TYPE === "text") {
            if (MSG_IN === "Repair request") {
                try {
                    const command = new client_dynamodb_1.ScanCommand({
                        TableName: KIND_COLLECTION,
                        FilterExpression: "#username = :u",
                        ExpressionAttributeNames: { '#username': 'username' },
                        ExpressionAttributeValues: {
                            ':u': { S: 'earth' },
                        },
                    });
                    const userProfile = yield docClient.send(command);
                    if (userProfile.Items.length !== 0) {
                        if (userProfile.Items.isProduct.includes('air_factory') && userProfile.Items.isProduct.includes('solar_roof')) {
                            const echo = { type: 'template', altText: 'demo', template: (0, airfac_solar_1.default)() };
                            return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                        }
                        else if (userProfile.Items.isProduct.includes('air_factory')) {
                            const echo = { type: 'template', altText: 'demo', template: (0, airfac_1.default)() };
                            return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                        }
                        else if (userProfile.Items.isProduct.includes('solar_roof')) {
                            const echo = { type: 'template', altText: 'demo', template: (0, solar_1.default)() };
                            return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                        }
                    }
                    else {
                        const replyPayload = { type: "text", text: `คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง https://main.d2b5ybccnf0kxx.amplifyapp.com/reigster/${USER_ID}` };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload);
                    }
                }
                catch (err) {
                    // res.send(err)
                    console.log("err => ", err);
                    const replyPayload = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload);
                }
            }
            else if (MSG_IN === "สมัครใช้งาน") {
                const payloadFlex = (0, flexRegisster_1.default)(USER_ID);
                const echo = { type: 'flex', altText: 'register', contents: payloadFlex };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
            else if (MSG_IN === "test") {
                const replyPayload = { type: "text", text: "status => 200" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload);
            }
            else if (MSG_IN === "Report SCG Air Factory") {
                try {
                    const command = new client_dynamodb_1.ScanCommand({
                        TableName: 'test',
                        FilterExpression: "#username = :u",
                        ExpressionAttributeNames: { '#username': 'username' },
                        ExpressionAttributeValues: {
                            ':u': { S: 'earth' },
                        },
                    });
                    const userProfile = yield docClient.send(command);
                    if (userProfile.Item.length !== 0) {
                        const payloadFlex = (0, flexAirFactory_1.default)(USER_ID);
                        const echo = { type: 'flex', altText: "report", contents: payloadFlex };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                    else {
                        const echo = { type: "text", text: `คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง https://demo-service-frontend-register-heim-zt27agut7a-as.a.run.app/reigster/${USER_ID}` };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
            else if (MSG_IN === "Report SCG Solar Roof") {
                try {
                    const command = new client_dynamodb_1.ScanCommand({
                        TableName: 'test',
                        FilterExpression: "#username = :u",
                        ExpressionAttributeNames: { '#username': 'username' },
                        ExpressionAttributeValues: {
                            ':u': { S: 'earth' },
                        },
                    });
                    const userProfile = yield docClient.send(command);
                    if (userProfile.Item.length !== 0) {
                        const payloadFlex = (0, flexSolarRoof_1.default)(USER_ID);
                        const echo = { type: 'flex', altText: "report", contents: payloadFlex };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                    else {
                        const echo = { type: "text", text: `คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง https://demo-service-frontend-register-heim-zt27agut7a-as.a.run.app/reigster/${USER_ID}` };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: err };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
            else if (MSG_IN === "1. air fac filter ตัน") {
                try {
                    const command = new lib_dynamodb_1.PutCommand({
                        TableName: KIND_REPORT,
                        Item: {
                            CreateDate: ms,
                            CustomerLineID: USER_ID,
                            SystemName: "air_factroy",
                            ProblemType: "1. filter ตัน",
                            Comment: "filter ตัน",
                            CloseCase: false
                        },
                    });
                    yield docClient.send(command);
                    const echo = { type: "text", text: "แจ้งปัญหา filter ตันเรียบร้อยแล้วค่ะ" };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
            else if (MSG_IN === "2. air fac ระบบเปิดไม่ติด") {
                try {
                    const command = new lib_dynamodb_1.PutCommand({
                        TableName: KIND_REPORT,
                        Item: {
                            CreateDate: ms,
                            CustomerLineID: USER_ID,
                            SystemName: "air_factroy",
                            ProblemType: "2. air fac ระบบเปิดไม่ติด",
                            Comment: "air fac ระบบเปิดไม่ติด",
                            CloseCase: false
                        },
                    });
                    yield docClient.send(command);
                    const echo = { type: "text", text: "แจ้งปัญหาระบบเปิดไม่ติดเรียบร้อยแล้วค่ะ" };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
            else if (MSG_IN === "3. air fac ระบบมีปัญหา") {
                try {
                    const command = new lib_dynamodb_1.PutCommand({
                        TableName: KIND_REPORT,
                        Item: {
                            CreateDate: ms,
                            CustomerLineID: USER_ID,
                            SystemName: "air_factroy",
                            ProblemType: "3. air fac ระบบมีปัญหา",
                            Comment: "air fac ระบบมีปัญหา",
                            CloseCase: false
                        },
                    });
                    yield docClient.send(command);
                    const echo = { type: "text", text: "แจ้งปัญหาระบบมีปัญหาเรียบร้อยแล้วค่ะ" };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
            else if (MSG_IN === "1. solar แจ้งทำความสะอาด") {
                try {
                    const command = new lib_dynamodb_1.PutCommand({
                        TableName: KIND_REPORT,
                        Item: {
                            CreateDate: ms,
                            CustomerLineID: USER_ID,
                            SystemName: "air_factroy",
                            ProblemType: "1. solar แจ้งทำความสะอาด",
                            Comment: "solar แจ้งทำความสะอาด",
                            CloseCase: false
                        },
                    });
                    yield docClient.send(command);
                    const echo = { type: "text", text: "แจ้งทำความสะอาด Solar เรียบร้อยแล้วค่ะ" };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
            else if (MSG_IN === "2. solar ระบบช็อต") {
                try {
                    const command = new lib_dynamodb_1.PutCommand({
                        TableName: KIND_REPORT,
                        Item: {
                            CreateDate: ms,
                            CustomerLineID: USER_ID,
                            SystemName: "solar_roof",
                            ProblemType: "2. solar ระบบช็อต",
                            Comment: "solar ระบบช็อต",
                            CloseCase: false
                        },
                    });
                    yield docClient.send(command);
                    const echo = { type: "text", text: "แจ้งปัญหา solar ระบบช็อตเรียบร้อยแล้วค่ะ" };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
            else if (MSG_IN === "3. solar ระบบมีปัญหา") {
                try {
                    const command = new lib_dynamodb_1.PutCommand({
                        TableName: KIND_REPORT,
                        Item: {
                            CreateDate: ms,
                            CustomerLineID: USER_ID,
                            SystemName: "solar_roof",
                            ProblemType: "3. solar ระบบมีปัญหา",
                            Comment: "solar ระบบมีปัญหา",
                            CloseCase: false
                        },
                    });
                    yield docClient.send(command);
                    const echo = { type: "text", text: "แจ้ง solar ระบบมีปัญหาเรียบร้อยแล้วค่ะ" };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
                catch (err) {
                    console.log("err => ", err);
                    const echo = { type: "text", text: JSON.stringify(err) };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
            }
        }
    });
}
exports.default = controllerLineAPI;
// export {controllerLineAPI}
