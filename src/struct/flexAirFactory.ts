export default function flexAirFactory (lineUserID: string) {
    // console.log()
    return {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
            "type": "image",
            "url": "https://img.freepik.com/free-vector/woman-relaxing-arm-chair-home_74855-5965.jpg?t=st=1698991899~exp=1698992499~hmac=86083303be8cb30a21fda3908fd16fba10cb1b986461021d77c3dcb3466238b4",
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
                        "label": "1. filter ตัน",
                        "text": "1. air fac filter ตัน"
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "action": {
                        "type": "message",
                        "label": "2. ระบบเปิดไม่ติด",
                        "text": "2. air fac ระบบเปิดไม่ติด"
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "action": {
                        "type": "message",
                        "label": "3. ระบบมีปัญหา",
                        "text": "3. air fac ระบบมีปัญหา"
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "action": {
                        "type": "uri",
                        "label": "4. อื่นๆ",
                        "uri": `https://main.d2b5ybccnf0kxx.amplifyapp.com/report/airfac/${lineUserID}`
                    },
                    "color": "#667DD2FF",
                    "style": "primary"
                }
            ]
        }
    }
}
// export { flexAirFactory }