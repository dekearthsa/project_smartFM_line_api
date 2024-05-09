// const { Storage } =  require('@google-cloud/storage');
// const {Datastore} = require('@google-cloud/datastore');

import {DynamoDBDocumentClient ,PutCommand } from  "@aws-sdk/lib-dynamodb";
import {DynamoDBClient } from  "@aws-sdk/client-dynamodb";

// const datastore = new Datastore();
const KIND_COLLECTION = "demo_user_line_id"
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export default async function controllerRegisterLine (req:any, res:any) {
    const {email, fristName, lastName, tel, userID, getMilisec, product,lineUserID, plantName  } = req.body;
    try{

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

        const command = new PutCommand({
            TableName: KIND_COLLECTION,
            Item: {
                Email: email,
                FristName: fristName,
                LastName: lastName,
                Tel: tel,
                UserID: userID,
                CreateDate: getMilisec?getMilisec:JSON.stringify(ms),
                IsProduct:product,
                LineUserId: lineUserID,
                PlantName: plantName,
            },
        });

        await docClient.send(command);
        const payloadReply = {
            isSave:true,
            desc: "Create new user plant success!"
        }
        res.send(payloadReply)
    }catch(err){
        console.log(`error controllerRegisterLine =>  ${err}`)
    }
}

// export {controllerRegisterLine}