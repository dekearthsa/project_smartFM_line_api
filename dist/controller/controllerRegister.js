"use strict";
// const { Storage } =  require('@google-cloud/storage');
// const {Datastore} = require('@google-cloud/datastore');
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
exports.controllerRegisterLine = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
// const datastore = new Datastore();
const KIND_COLLECTION = "demo_user_line_id";
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const controllerRegisterLine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fristName, lastName, tel, userID, getMilisec, product, lineUserID, plantName } = req.body;
    try {
        const date = new Date();
        const ms = date.getTime();
        // const taskKey = datastore.key([KIND_COLLECTION]);
        // const task = {
        //     key: taskKey,
        //     data: {
        //         Email: email,
        //         FristName: fristName,
        //         LastName: lastName,
        //         Tel: tel,
        //         UserID: userID,
        //         createDate: getMilisec,
        //         isProduct:product,
        //         lineUserId: lineUserId,
        //         plantName: plantName,
        //     }
        // }
        // await datastore.save(task);
        const command = new lib_dynamodb_1.PutCommand({
            TableName: KIND_COLLECTION,
            Item: {
                Email: email,
                FristName: fristName,
                LastName: lastName,
                Tel: tel,
                UserID: userID,
                CreateDate: getMilisec ? getMilisec : ms,
                IsProduct: product,
                LineUserId: lineUserID,
                PlantName: plantName,
            },
        });
        yield docClient.send(command);
        const payloadReply = {
            isSave: true,
            desc: "Create new user plant success!"
        };
        res.send(payloadReply);
    }
    catch (err) {
        console.log(`error controllerRegisterLine =>  ${err}`);
    }
});
exports.controllerRegisterLine = controllerRegisterLine;
