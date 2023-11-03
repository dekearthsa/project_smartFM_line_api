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
exports.controllerOtherReport = void 0;
const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();
// const KIND_COLLECTION = "demo_user_line_id"
const KIND_REPORT = "demo_user_line_report";
const controllerOtherReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lineUserID, systemType, report, typeReport } = req.body;
    const date = new Date();
    const ms = date.getTime();
    try {
        const taskKey = datastore.key([KIND_REPORT]);
        const task = {
            key: taskKey,
            data: {
                CreateDate: ms,
                CustomerLineID: lineUserID,
                SystemName: systemType,
                ProblemType: typeReport,
                comment: report,
                closeCase: false
            }
        };
        yield datastore.save(task);
        const payloadReply = {
            isErr: false,
            desc: ""
        };
        res.send(payloadReply);
    }
    catch (err) {
        console.log(err);
        const payloadReply = {
            isErr: true,
            desc: err
        };
        res.send(payloadReply);
    }
});
exports.controllerOtherReport = controllerOtherReport;
