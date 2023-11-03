// const { Storage } =  require('@google-cloud/storage');
const {Datastore} = require('@google-cloud/datastore');


const datastore = new Datastore();
const KIND_COLLECTION = "demo_user_line_id"

const controllerRegisterLine = async (req:any, res:any) => {
    const {email, fristName, lastName, tel, userID,getMilisec, product,lineUserId, plantName,  } = req.body;
    try{
        const taskKey = datastore.key([KIND_COLLECTION]);
        const task = {
            key: taskKey,
            data: {
                Email: email,
                FristName: fristName,
                LastName: lastName,
                Tel: tel,
                UserID: userID,
                createDate: getMilisec,
                isProduct:product,
                lineUserId: lineUserId,
                plantName: plantName,
            }
        }
        await datastore.save(task);
        const payloadReply = {
            isSave:true,
            desc: "Create new user plant success!"
        }
        res.send(payloadReply)
    }catch(err){
        console.log(`error controllerRegisterLine =>  ${err}`)
    }
}

export {controllerRegisterLine}