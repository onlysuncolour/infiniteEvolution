export enum EMapNodeType  {
    enemy = 0, // 遇到敌人
    search = 1, // 搜索
    event = 2, // 触发事件
    mine = 3, // 挖矿
    observe = 4, // 观察
    setEnv = 5, // 设置环境
    boss = 6, // 遇到boss
}

export enum EWeaponType  {
    coolWeapon_oneHand = 0, // 单手冷兵器
    coolWeapon_twoHand = 1, // 双手冷兵器
    gun_oneHand = 2, // 单手枪
    gun_twoHand = 3, // 双手重枪
    ammo = 4, // 弹药 
}

export enum EEquipmentType {
    weapon = 0, // 武器
    helmet = 1, // 头盔
    armour = 2, // armour_full 全身甲
    armour_half = 3, // 半身甲
    cout = 4, // 外套
    jacket = 5, // 上衣
    trousers = 6, // 外裤
    pants = 7, // 裤子
    boots = 8, // 鞋子

    necklace = 9, // 项链
    ring = 10, // 戒指

    shoulderpad = 11, //护肩
    bracer = 12, // 护腕
    kneepad = 13, // 护膝
    shinGuards = 14, // 护腿
    socks = 15, // 袜子
    underware = 16, // 内衣

    mask = 17, // 面具
    amulet = 18, // 护身符
    medal = 19, // 勋章
    brooch = 20, // 胸针
}

export enum EEquipmentLevel {
    U = 0, // 独一无二的
    SSS = 1,
    SS = 2,
    S = 3, // S级
    AA = 4,
    A = 5, // A级
    BB = 6,
    B = 7, // B级装备
    CC = 8,
    C = 9, // C级装备
    DD = 10,
    D = 11, // D级装备
    O = 12, // 随手可得 
}

export enum EDamageType {
    physical = 0,
    magic = 1,
    heal = 2,
    buff = 3,
    soul = 4, // 灵魂
    san = 5, // san 精神
}

export enum EMagicType {
    fire = 0, // 火
    water = 1, // 水
    ice = 2, // 冰
    metal = 3, // 金
    wind = 4, // 风
    thunder = 5, // 雷
    earth = 6, // 土
    wood = 7, // 木
    poison = 8, // 毒
    radiation = 9, // 辐射
    qi = 10, // 内功 气 无属性magic伤害
}