const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
const KIND_COLLECTION = "demo_user_line_id"

const controllerCreateProfile = async (req:any, res:any) => {
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
        const taskKey = datastore.key([KIND_COLLECTION]);
        const task = {
            key: taskKey,
            data:{
                Email: email,
                FristName: fristName,
                LastName: lastName,
                Tel: tel,
                UserID: userID,
                createDate: ms,
                isProduct: isProduct,
                lineUserId: lineUser,
                plantName: plantName
            }
        }

        await datastore.save(task)
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

export {controllerCreateProfile}