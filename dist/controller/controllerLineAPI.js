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
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerLineAPI = void 0;
const line = require("@line/bot-sdk");
const { Datastore } = require('@google-cloud/datastore');
const { funcCarousel } = require("../struct/airfac_solar");
const CHANNEL_SECRET = "a123dfdce669ad6868727b47f64415ad";
const CHANNEL_ACCESS_TOKEN = "lqHG6mhwJDMus7YLEZbXXRcQsBMSr3gaJCSwIKVBJgc/5jfCit8goM8Gu0RDCzIYsicBN1BdL+RqBkhFsDSQ+e8zwo6UTn2T35zIBwcAVT5tgu9rnu4QeTjnMCpFibp9D8aU8KR19JM0IVX9Nf9NfAdB04t89/1O/w1cDnyilFU=";
const KIND_COLLECTION = "demo_user_line_id";
const CONFIG = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
};
const datastore = new Datastore();
const LINE_CLIENT = new line.Client(CONFIG);
const controllerLineAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const MSG_TYPE = body.events[0].message.type;
    const REPLY_TOKEN = req.body.events[0].replyToken;
    // const USER_TYPE = req.body.events[0].source.type;
    const USER_ID = req.body.events[0].source.userId;
    const MSG_IN = body.events[0].message.text;
    // const {MSG_TYPE, MSG_IN, USER_ID} = req.body; 
    if (MSG_TYPE === "text") {
        if (MSG_IN === "Repair request") {
            try {
                const structQuery = datastore.createQuery(KIND_COLLECTION)
                    .filter("lineUserId", "=", "demo");
                const [userProfile] = yield datastore.runQuery(structQuery);
                if (userProfile.length !== 0) {
                    console.log("not empty!");
                    const echo = { type: 'template', altText: 'demo', template: funcCarousel() };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }
                else {
                    const replyPayload = { type: "text", text: "คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง" };
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload);
                }
            }
            catch (err) {
                // res.send(err)
                console.log("err => ", err);
                const replyPayload = { type: "text", text: "Internal error 500!" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload);
            }
        }
        else if (MSG_IN === "test") {
            const replyPayload = { type: "text", text: "status => 200" };
            return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload);
        }
    }
});
exports.controllerLineAPI = controllerLineAPI;
