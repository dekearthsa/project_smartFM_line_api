"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flexDemoReply = void 0;
const flexDemoReply = (lineId) => {
    // console.log()
    return {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
            "type": "image",
            "url": "https://cdn-icons-png.flaticon.com/512/10253/10253861.png",
            "size": "full",
            "aspectRatio": "1.51:1",
            "aspectMode": "fit"
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "สมัครการใช้งาน",
                    "align": "center",
                    "contents": []
                },
                // {
                //     "type": "text",
                //     "text": `msg => ${lineId}`,
                //     "align": "center",
                //     "contents": []
                // },
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "button",
                    "action": {
                        "type": "uri",
                        "label": "Regsiter",
                        "uri": `https://demo-service-frontend-register-heim-zt27agut7a-as.a.run.app/reigster/${lineId}`
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                }
            ]
        }
    };
};
exports.flexDemoReply = flexDemoReply;
