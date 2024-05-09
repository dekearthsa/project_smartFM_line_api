export default function flexSolarRoof (lineUserID: string){
    // console.log()
    return {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
            "type": "image",
            "url": "https://img.freepik.com/free-vector/solar-panels-installation-flat-composition-with-two-male-characters-working-roof-top-illustration_1284-62168.jpg?t=st=1698998186~exp=1698998786~hmac=0c3a38c70a421bcd6e9eca6f090302e28a507c1281dc58508989dcdcdac31bb1",
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
                    "text": "กรุณาเลือกหัวข้อของ",
                    "align": "center",
                    "contents": []
                },
                {
                    "type": "text",
                    "text": "ปัญหาที่ต้องการรายงาน",
                    "align": "center",
                    "contents": []
                },
                {
                    "type": "text",
                    "text": "โดยกดที่ตัวเลือกดังต่อ",
                    "align": "center",
                    "contents": []
                },
                {
                    "type": "text",
                    "text": "ไปนี้",
                    "align": "center",
                    "contents": []
                },
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "button",
                    "action": {
                        "type": "message",
                        "label": "1. แจ้งทำความสะอาด",
                        "text": "1. solar แจ้งทำความสะอาด"
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "action": {
                        "type": "message",
                        "label": "2. ระบบช็อต",
                        "text": "2. solar ระบบช็อต"
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "action": {
                        "type": "message",
                        "label": "3. ระบบมีปัญหา",
                        "text": "3. solar ระบบมีปัญหา"
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "action": {
                        "type": "uri",
                        "label": "4. อื่นๆ",
                        "uri": `https://main.d2b5ybccnf0kxx.amplifyapp.com/report/solar/${lineUserID}`
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                }
            ]
        }
    }
}
// export { flexSolarRoof }