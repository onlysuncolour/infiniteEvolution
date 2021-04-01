import Item from './item'

export interface IEquipmentOtherDamage {
    value: number;
    type: string;
    status?: string;
}
export interface IEquipmentOtherDefense {
    value: number;
    type: string;
    status?: string;
}

export interface IEquipmentDefenseIgnore {
    value: number;
    type: string;
}

export class Equipment extends Item {
    type: string;

    damage: number; // 伤害值
    damageType: string; // 伤害类型
    status: string;
    otherDamages: IEquipmentOtherDamage[]; // 其他伤害
    
    defense?: number; // 防御值
    defenseType?: number; // 防御类型
    otherDefenses: IEquipmentOtherDefense[]; // 其他防御

    hitRatio?: number; // 命中率
    
    critRatio?: number; // 暴击率
    critDamage?: number; // 暴击伤害

    defenseIgnore?: IEquipmentDefenseIgnore[]; // 忽视防御

    ammoNeed?: boolean; // 射击类 限定
    ammoNeedType?: string; // 射击类 限定

    ammoType?: string; // 弹药类 限定
}