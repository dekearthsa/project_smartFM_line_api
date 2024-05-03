
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export const dynamoDbClient = new DynamoDBClient({ region: 'ap-southeast-1' });


export const handler = async (event) => {
    // TODO implement
    const params = {
        TableName: 'test',
        FilterExpression: "#username = :u",
        ExpressionAttributeNames: { '#username': 'username' },
        ExpressionAttributeValues: {
            ':u': { S: 'earth' },
        },
    };

    try {
        const response = await dynamoDbClient.send(new ScanCommand(params));
        return response
    }
    catch (err) {
        // console.error(e.message);
        return JSON.stringify(err)
    }

};

