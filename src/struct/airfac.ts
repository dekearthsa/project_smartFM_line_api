function funcCarouselAirfac() {
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
                        "text": "SCG Air Factory"
                    },
                ]
            },
        ],
        "imageAspectRatio": "rectangle",
        "imageSize": "cover"
    }
}

export { funcCarouselAirfac }; 