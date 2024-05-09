import  line  from "@line/bot-sdk";


const CHANNEL_SECRET ="a123dfdce669ad6868727b47f64415ad";
const CHANNEL_ACCESS_TOKEN ="lqHG6mhwJDMus7YLEZbXXRcQsBMSr3gaJCSwIKVBJgc/5jfCit8goM8Gu0RDCzIYsicBN1BdL+RqBkhFsDSQ+e8zwo6UTn2T35zIBwcAVT5tgu9rnu4QeTjnMCpFibp9D8aU8KR19JM0IVX9Nf9NfAdB04t89/1O/w1cDnyilFU=";

// // setup line bot api // //
const CONFIG = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
}
// // body // //
// {
//     lineID: 'xxxx', 
//     msg: 'Tesssssss'
// }

const LINE_CLIENT = new line.Client(CONFIG);

export default async function controllerLinePush  (req:any, res:any) {
    const {lineID, msg} = req.body;
    if(lineID){
        if(msg){
            const echo:any = {type: "text", altText:"Demo message.", text: msg}
            LINE_CLIENT.pushMessage(lineID,echo)
            res.send("ok")
        }else{
            console.log("message undefined")
            const echo:any = {type: "text", altText: "undefined message.", text: "undefined message! format POST {lineID, msg}"}
            LINE_CLIENT.pushMessage(lineID,echo)
            res.send("ok")
        }
    }else{
        console.log("undefined lineID")
        const echo:any = {type: "text", altText: "undefined text", text: "undefined message! format POST {lineID, msg}"}
        res.send(echo)
    }

}

// export {controllerLinePush}