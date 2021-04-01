export default [
    {
        "id": 0,
        "name": "奋力一击",
        "effects": [
            {damageAddition: 2, damageAddAttr: "strength", damageType: "normal"},
            // {damage: 10, damageType: 'normal'}
        ]
    },
    {
        "id": 1,
        "name": "三次打击",
        "effects": [
            {damageAddition: 3, damageAddAttr: 'attack', damageType: "normal"}
        ]
    },
    {
        "id": 2,
        "name": "致命一击",
        "effects": [
            {damage: 50, damageType: "normal"}
        ]
    },
    
]