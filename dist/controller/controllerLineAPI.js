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
const { funcCarouselAirfac } = require("../struct/airfac");
const { funcCarouselSolar } = require("../struct/solar");
const { flexRegister } = require("../struct/flexRegisster");
const { flexAirFactory } = require("../struct/flexAirFactory");
const { flexSolarRoof } = require("../struct/flexSolarRoof");
const CHANNEL_SECRET = "a123dfdce669ad6868727b47f64415ad";
const CHANNEL_ACCESS_TOKEN = "lqHG6mhwJDMus7YLEZbXXRcQsBMSr3gaJCSwIKVBJgc/5jfCit8goM8Gu0RDCzIYsicBN1BdL+RqBkhFsDSQ+e8zwo6UTn2T35zIBwcAVT5tgu9rnu4QeTjnMCpFibp9D8aU8KR19JM0IVX9Nf9NfAdB04t89/1O/w1cDnyilFU=";
const KIND_COLLECTION = "demo_user_line_id";
const KIND_REPORT = "demo_user_line_report";
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
    const date = new Date();
    const ms = date.getTime();
    // const {MSG_TYPE, MSG_IN, USER_ID} = req.body; 
    if (MSG_TYPE === "text") {
        if (MSG_IN === "Repair request") {
            try {
                const structQuery = datastore.createQuery(KIND_COLLECTION)
                    .filter("lineUserId", "=", USER_ID);
                const [userProfile] = yield datastore.runQuery(structQuery);
                // console.log(userProfile)
                if (userProfile.length !== 0) {
                    if (userProfile[0].isProduct.includes('air_factory') && userProfile[0].isProduct.includes('solar_roof')) {
                        const echo = { type: 'template', altText: 'demo', template: funcCarousel() };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                    else if (userProfile[0].isProduct.includes('air_factory')) {
                        const echo = { type: 'template', altText: 'demo', template: funcCarouselAirfac() };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                    else if (userProfile[0].isProduct.includes('solar_roof')) {
                        const echo = { type: 'template', altText: 'demo', template: funcCarouselSolar() };
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                }
                else {
                    const replyPayload = { type: "text", text: `คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง https://demo-service-frontend-register-heim-zt27agut7a-as.a.run.app/reigster/${USER_ID}` };
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
        else if (MSG_IN === "สมัครใช้งาน") {
            const payloadFlex = flexRegister(USER_ID);
            const echo = { type: 'flex', altText: 'register', contents: payloadFlex };
            return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
        }
        else if (MSG_IN === "test") {
            const replyPayload = { type: "text", text: "status => 200" };
            return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload);
        }
        else if (MSG_IN === "Report SCG Air Factory") {
            try {
                const structQuery = datastore.createQuery(KIND_COLLECTION)
                    .filter("lineUserId", "=", USER_ID);
                const [userProfile] = yield datastore.runQuery(structQuery);
                if (userProfile.length !== 0) {
                    const payloadFlex = flexAirFactory(USER_ID);
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
        else if (MSG_IN === "Report SCG Solar Roof") {
            try {
                const structQuery = datastore.createQuery(KIND_COLLECTION)
                    .filter("lineUserId", "=", USER_ID);
                const [userProfile] = yield datastore.runQuery(structQuery);
                if (userProfile.length !== 0) {
                    const payloadFlex = flexSolarRoof(USER_ID);
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
                const taskKey = datastore.key([KIND_REPORT]);
                const task = {
                    key: taskKey,
                    data: {
                        CreateDate: ms,
                        CustomerLineID: USER_ID,
                        SystemName: "air_factroy",
                        ProblemType: "1. filter ตัน",
                        comment: "filter ตัน",
                        closeCase: false
                    }
                };
                yield datastore.save(task);
                const echo = { type: "text", text: "แจ้งปัญหา filter ตันเรียบร้อยแล้วค่ะ" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
            catch (err) {
                console.log("err => ", err);
                const echo = { type: "text", text: err };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
        }
        else if (MSG_IN === "2. air fac ระบบเปิดไม่ติด") {
            try {
                const taskKey = datastore.key([KIND_REPORT]);
                const task = {
                    key: taskKey,
                    data: {
                        CreateDate: ms,
                        CustomerLineID: USER_ID,
                        SystemName: "air_factroy",
                        ProblemType: "2. ระบบเปิดไม่ติด",
                        comment: "ระบบเปิดไม่ติด",
                        closeCase: false
                    }
                };
                yield datastore.save(task);
                const echo = { type: "text", text: "แจ้งปัญหาระบบเปิดไม่ติดเรียบร้อยแล้วค่ะ" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
            catch (err) {
                console.log("err => ", err);
                const echo = { type: "text", text: err };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
        }
        else if (MSG_IN === "3. air fac ระบบมีปัญหา") {
            try {
                const taskKey = datastore.key([KIND_REPORT]);
                const task = {
                    key: taskKey,
                    data: {
                        CreateDate: ms,
                        CustomerLineID: USER_ID,
                        SystemName: "air_factroy",
                        ProblemType: "3. ระบบมีปัญหา",
                        comment: "ระบบมีปัญหา",
                        closeCase: false
                    }
                };
                yield datastore.save(task);
                const echo = { type: "text", text: "แจ้งปัญหาระบบมีปัญหาเรียบร้อยแล้วค่ะ" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
            catch (err) {
                console.log("err => ", err);
                const echo = { type: "text", text: err };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
        }
        else if (MSG_IN === "1. solar แจ้งทำความสะอาด") {
            try {
                const taskKey = datastore.key([KIND_REPORT]);
                const task = {
                    key: taskKey,
                    data: {
                        CreateDate: ms,
                        CustomerLineID: USER_ID,
                        SystemName: "solar_roof",
                        ProblemType: "1. แจ้งทำความสะอาด",
                        comment: "แจ้งทำความสะอาด",
                        closeCase: false
                    }
                };
                yield datastore.save(task);
                const echo = { type: "text", text: "แจ้งทำความสะอาด Solar เรียบร้อยแล้วค่ะ" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
            catch (err) {
                console.log("err => ", err);
                const echo = { type: "text", text: err };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
        }
        else if (MSG_IN === "2. solar ระบบช็อต") {
            try {
                const taskKey = datastore.key([KIND_REPORT]);
                const task = {
                    key: taskKey,
                    data: {
                        CreateDate: ms,
                        CustomerLineID: USER_ID,
                        SystemName: "solar_roof",
                        ProblemType: "2. solar ระบบช็อต",
                        comment: "solar ระบบช็อต",
                        closeCase: false
                    }
                };
                yield datastore.save(task);
                const echo = { type: "text", text: "แจ้งปัญหา solar ระบบช็อตเรียบร้อยแล้วค่ะ" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
            catch (err) {
                console.log("err => ", err);
                const echo = { type: "text", text: err };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
        }
        else if (MSG_IN === "3. solar ระบบมีปัญหา") {
            try {
                const taskKey = datastore.key([KIND_REPORT]);
                const task = {
                    key: taskKey,
                    data: {
                        CreateDate: ms,
                        CustomerLineID: USER_ID,
                        SystemName: "solar_roof",
                        ProblemType: "3. solar ระบบมีปัญหา",
                        comment: "solar ระบบมีปัญหา",
                        closeCase: false
                    }
                };
                yield datastore.save(task);
                const echo = { type: "text", text: "แจ้ง solar ระบบมีปัญหาเรียบร้อยแล้วค่ะ" };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
            catch (err) {
                console.log("err => ", err);
                const echo = { type: "text", text: err };
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
            }
        }
    }
});
exports.controllerLineAPI = controllerLineAPI;
