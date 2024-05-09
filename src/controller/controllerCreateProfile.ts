import  { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"; 
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const KIND_COLLECTION = "demo_user_line_id"

export default async function  controllerCreateProfile  (req:any, res:any) {
    const {
        email, 
        fristName, 
        lastName, 
        tel, userID, 
        isProduct, 
        lineUser, 
        plantName} = req.body;
    
    const date = new Date();
    const ms = date.getTime();

    try{
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

        const command = new PutCommand({
            TableName: KIND_COLLECTION,
            Item: {
                Email: email,
                FristName: fristName,
                LastName: lastName,
                Tel: tel,
                UserID: userID,
                CreateDate: ms,
                IsProduct: isProduct,
                LineUserId: lineUser,
                PlantName: plantName
            },
        });

        await docClient.send(command);
        const replyPayload = {
            isSave: true,
            desc: "Create success!"
        }

        res.send(replyPayload);
    }catch(err){
        console.log(err)
        res.send(err)
    }
    


}

// export {controllerCreateProfile}