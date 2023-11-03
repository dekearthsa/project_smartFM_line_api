function funcCarousel() {
    return {
        "type": "carousel",
        "columns": [
            {
                "thumbnailImageUrl": "https://cdn-icons-png.flaticon.com/512/5133/5133504.png",
                "imageBackgroundColor": "#FFFFFF",
                "title": "Air factory",
                "text": "Air factory report",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "https://cdn-icons-png.flaticon.com/512/5133/5133504.png"
                },
                "actions": [
                    {
                        "type": "message",
                        "label": "ดำเนินการ",
                        "text": "Report SCG Air Factory"
                    },
                ]
            },
            {
                "thumbnailImageUrl": "https://cdn-icons-png.flaticon.com/512/234/234784.png",
                "imageBackgroundColor": "#000000",
                "title": "Solar Roof",
                "text": "Solar report",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "https://cdn-icons-png.flaticon.com/512/234/234784.png"
                },
                "actions": [
                    {
                        "type": "message",
                        "label": "ดำเนินการ",
                        "text": "Report SCG Solar Roof"
                    },
                ]
            },
        ],
        "imageAspectRatio": "rectangle",
        "imageSize": "cover"
    }
}

export { funcCarousel }; 