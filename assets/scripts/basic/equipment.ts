import { EDamageType, EEquipmentLevel, EEquipmentType } from './enums';
import Item from './item'

export interface IEquipmentOtherDamage {
    value: number;
    type: EDamageType;
    status?: string;
}
export interface IEquipmentOtherDefense {
    value: number;
    type: EDamageType;
    status?: string;
}

export interface IEquipmentDefenseIgnore {
    value: number;
    type: EDamageType;
}

export class Equipment extends Item {
    equipmentType: EEquipmentType;

    level: EEquipmentLevel;

    damage: number; // 伤害值
    damageType: EDamageType; // 伤害类型
    status: string;
    otherDamages: IEquipmentOtherDamage[]; // 其他伤害
    
    defense?: number; // 防御值
    defenseType?: EDamageType; // 防御类型
    otherDefenses: IEquipmentOtherDefense[]; // 其他防御

    hitRatio?: number; // 命中率
    
    critRatio?: number; // 暴击率
    critDamage?: number; // 暴击伤害

    defenseIgnore?: IEquipmentDefenseIgnore[]; // 忽视防御

    ammoNeed?: boolean; // 射击类 限定
    ammoNeedType?: string; // 射击类 限定

    ammoType?: string; // 弹药类 限定
}