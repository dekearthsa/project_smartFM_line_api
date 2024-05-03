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
exports.controllerCreateProfile = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const KIND_COLLECTION = "demo_user_line_id";
const controllerCreateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fristName, lastName, tel, userID, isProduct, lineUser, plantName } = req.body;
    const date = new Date();
    const ms = date.getTime();
    try {
        // const taskKey = datastore.key([KIND_COLLECTION]);
        // const task = {
        //     key: taskKey,
        //     data:{
        //         Email: email,
        //         FristName: fristName,
        //         LastName: lastName,
        //         Tel: tel,
        //         UserID: userID,
        //         createDate: ms,
        //         isProduct: isProduct,
        //         lineUserId: lineUser,
        //         plantName: plantName
        //     }
        // }
        // await datastore.save(task)
        const command = new lib_dynamodb_1.PutCommand({
            TableName: KIND_COLLECTION,
            Item: {
                Email: email,
                FristName: fristName,
                LastName: lastName,
                Tel: tel,
                UserID: userID,
                createDate: ms,
                isProduct: isProduct,
                lineUserId: lineUser,
                plantName: plantName
            },
        });
        yield docClient.send(command);
        const replyPayload = {
            isSave: true,
            desc: "Create success!"
        };
        res.send(replyPayload);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});
exports.controllerCreateProfile = controllerCreateProfile;
