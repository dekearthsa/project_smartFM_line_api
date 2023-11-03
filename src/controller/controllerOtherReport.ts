const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
// const KIND_COLLECTION = "demo_user_line_id"
const KIND_REPORT = "demo_user_line_report"

const controllerOtherReport = async (req:any, res:any) => {
    const {lineUserID, systemType ,report, typeReport} = req.body
    const date = new Date();
    const ms = date.getTime();

    try{
        const taskKey = datastore.key([KIND_REPORT])
        const task = {
            key:taskKey,
            data:{
                CreateDate: ms,
                CustomerLineID: lineUserID,
                SystemName: systemType,
                ProblemType: typeReport,
                comment: report,
                closeCase: false
            }
        }
        await datastore.save(task);
        const payloadReply = {
            isErr: false,
            desc: ""
        }

        res.send(payloadReply)
    }catch(err){
        console.log(err)
        const payloadReply = {
            isErr: true,
            desc: err
        }
        res.send(payloadReply)
    }
    
}

export {controllerOtherReport}