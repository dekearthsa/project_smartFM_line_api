import  line from "@line/bot-sdk";
import { DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb"; 
import  { DynamoDBClient, ScanCommand  } from "@aws-sdk/client-dynamodb";

import funcCarousel from "../struct/airfac_solar";
import funcCarouselAirfac from "../struct/airfac";
import funcCarouselSolar from "../struct/solar";
import flexRegister from "../struct/flexRegisster";
import flexAirFactory from "../struct/flexAirFactory";
import flexSolarRoof from "../struct/flexSolarRoof";

const CHANNEL_SECRET ="a123dfdce669ad6868727b47f64415ad";
const CHANNEL_ACCESS_TOKEN ="lqHG6mhwJDMus7YLEZbXXRcQsBMSr3gaJCSwIKVBJgc/5jfCit8goM8Gu0RDCzIYsicBN1BdL+RqBkhFsDSQ+e8zwo6UTn2T35zIBwcAVT5tgu9rnu4QeTjnMCpFibp9D8aU8KR19JM0IVX9Nf9NfAdB04t89/1O/w1cDnyilFU=";
const KIND_COLLECTION = "demo_user_line_id"
const KIND_REPORT = "demo_user_line_report"

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const CONFIG = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
}
const LINE_CLIENT = new line.Client(CONFIG)

const controllerLineAPI = async (req:any , res:any) => {
    const body = req.body; 
    const MSG_TYPE = body.events[0].message.type;
    const REPLY_TOKEN = req.body.events[0].replyToken;
    // const USER_TYPE = req.body.events[0].source.type;
    const USER_ID = req.body.events[0].source.userId;
    const MSG_IN = body.events[0].message.text;
    const date = new Date();
    const ms = date.getTime();

    // const {MSG_TYPE, MSG_IN, USER_ID} = req.body; 

    if(MSG_TYPE === "text"){
        if(MSG_IN === "Repair request"){
            try{
                const command = new ScanCommand({
                    TableName: KIND_COLLECTION,
                    FilterExpression: "#username = :u",
                    ExpressionAttributeNames: {'#username': 'username'},
                    ExpressionAttributeValues: {
                        ':u': {S: 'earth'},
                    },      
                });
                const userProfile:any = await docClient.send(command);

                if(userProfile.Items.length !== 0){

                    if(userProfile.Items.isProduct.includes('air_factory') && userProfile.Items.isProduct.includes('solar_roof')){
                        const echo:any = {type: 'template', altText: 'demo', template: funcCarousel()}
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }else if(userProfile.Items.isProduct.includes('air_factory')){
                        const echo:any = {type: 'template', altText: 'demo', template: funcCarouselAirfac()}
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }else if(userProfile.Items.isProduct.includes('solar_roof')){
                        const echo:any = {type: 'template', altText: 'demo', template: funcCarouselSolar()}
                        return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                    }
                    
                }else{
                    const replyPayload:any = {type: "text", text: `คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง https://demo-service-frontend-register-heim-zt27agut7a-as.a.run.app/reigster/${USER_ID}`}
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload)
                }
            }catch(err){
                // res.send(err)
                console.log("err => ",err)
                const replyPayload:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload)
            }
        }else if(MSG_IN === "สมัครใช้งาน"){

            const payloadFlex =  flexRegister(USER_ID)
            const echo:any = { type: 'flex', altText: 'register', contents: payloadFlex }
            return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)

        }else if(MSG_IN === "test"){
            const replyPayload:any = {type: "text", text: "status => 200"}
            return LINE_CLIENT.replyMessage(REPLY_TOKEN, replyPayload)

        }else if(MSG_IN === "Report SCG Air Factory") {
            try{
                const command = new ScanCommand({
                    TableName: 'test',
                    FilterExpression: "#username = :u",
                    ExpressionAttributeNames: {'#username': 'username'},
                    ExpressionAttributeValues: {
                        ':u': {S: 'earth'},
                    },      
                });
                const userProfile:any = await docClient.send(command);

                if(userProfile.Item.length !== 0){
                    const payloadFlex = flexAirFactory(USER_ID);
                    const echo:any = {type: 'flex', altText: "report", contents: payloadFlex};
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo);
                }else{
                    const echo:any = {type: "text", text: `คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง https://demo-service-frontend-register-heim-zt27agut7a-as.a.run.app/reigster/${USER_ID}`}
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
                }
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
            
        }else if(MSG_IN === "Report SCG Solar Roof") {

            try{
                const command = new ScanCommand({
                    TableName: 'test',
                    FilterExpression: "#username = :u",
                    ExpressionAttributeNames: {'#username': 'username'},
                    ExpressionAttributeValues: {
                        ':u': {S: 'earth'},
                    },      
                });
                const userProfile:any = await docClient.send(command);

                if(userProfile.Item.length !== 0){
                    const payloadFlex = flexSolarRoof(USER_ID)
                    const echo:any = {type: 'flex', altText: "report", contents: payloadFlex}
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
                }else{
                    const echo:any = {type: "text", text: `คุณยังไม่ได้ลงทะเบียน รบกวนลงทะเบียนก่อนตามเมนูด้านล่าง https://demo-service-frontend-register-heim-zt27agut7a-as.a.run.app/reigster/${USER_ID}`}
                    return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
                }
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: err}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
        }else if(MSG_IN === "1. air fac filter ตัน"){
            try{

                const command = new PutCommand({
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

                await docClient.send(command);

                const echo:any = {type:"text", text:"แจ้งปัญหา filter ตันเรียบร้อยแล้วค่ะ"}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
        }else if(MSG_IN === "2. air fac ระบบเปิดไม่ติด"){
            try{
                const command = new PutCommand({
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

                await docClient.send(command);
                const echo:any = {type:"text", text:"แจ้งปัญหาระบบเปิดไม่ติดเรียบร้อยแล้วค่ะ"}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
        }else if(MSG_IN === "3. air fac ระบบมีปัญหา"){
            try{
                const command = new PutCommand({
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

                await docClient.send(command);
                const echo:any = {type:"text", text:"แจ้งปัญหาระบบมีปัญหาเรียบร้อยแล้วค่ะ"}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
        }else if(MSG_IN === "1. solar แจ้งทำความสะอาด"){
            try{
                const command = new PutCommand({
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

                await docClient.send(command);
                const echo:any = {type:"text", text:"แจ้งทำความสะอาด Solar เรียบร้อยแล้วค่ะ"}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
        }else if(MSG_IN === "2. solar ระบบช็อต"){
            try{
                const command = new PutCommand({
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

                await docClient.send(command);
                const echo:any = {type:"text", text:"แจ้งปัญหา solar ระบบช็อตเรียบร้อยแล้วค่ะ"}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
        }else if(MSG_IN === "3. solar ระบบมีปัญหา"){
            try{

                const command = new PutCommand({
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

                await docClient.send(command);
                const echo:any = {type:"text", text:"แจ้ง solar ระบบมีปัญหาเรียบร้อยแล้วค่ะ"}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }catch(err){
                console.log("err => ", err)
                const echo:any = {type: "text", text: JSON.stringify(err)}
                return LINE_CLIENT.replyMessage(REPLY_TOKEN, echo)
            }
            
        }
    }

}

export {controllerLineAPI}
