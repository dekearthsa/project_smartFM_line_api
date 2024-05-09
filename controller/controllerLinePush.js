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
const CHANNEL_SECRET = "a123dfdce669ad6868727b47f64415ad";
const CHANNEL_ACCESS_TOKEN = "lqHG6mhwJDMus7YLEZbXXRcQsBMSr3gaJCSwIKVBJgc/5jfCit8goM8Gu0RDCzIYsicBN1BdL+RqBkhFsDSQ+e8zwo6UTn2T35zIBwcAVT5tgu9rnu4QeTjnMCpFibp9D8aU8KR19JM0IVX9Nf9NfAdB04t89/1O/w1cDnyilFU=";
// // setup line bot api // //
const CONFIG = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
};
// // body // //
// {
//     lineID: 'xxxx', 
//     msg: 'Tesssssss'
// }
const LINE_CLIENT = new bot_sdk_1.Client(CONFIG);
function controllerLinePush(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { lineID, msg } = req.body;
        if (lineID) {
            if (msg) {
                const echo = { type: "text", altText: "Demo message.", text: msg };
                LINE_CLIENT.pushMessage(lineID, echo);
                res.send("ok");
            }
            else {
                console.log("message undefined");
                const echo = { type: "text", altText: "undefined message.", text: "undefined message! format POST {lineID, msg}" };
                LINE_CLIENT.pushMessage(lineID, echo);
                res.send("ok");
            }
        }
        else {
            console.log("undefined lineID");
            const echo = { type: "text", altText: "undefined text", text: "undefined message! format POST {lineID, msg}" };
            res.send(echo);
        }
    });
}
exports.default = controllerLinePush;
// export {controllerLinePush}
