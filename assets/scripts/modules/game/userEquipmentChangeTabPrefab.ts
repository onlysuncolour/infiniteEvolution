// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Equipment } from "../../basic/equipment";
import EquipmentItemPrefabComponent from "./equipmentItemPrefab";
import UserEquipmentItemLinePrefabComponent from "./userEquipmentItemLinePrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserEquipmentChangeTabPrefabComponent extends cc.Component {

    @property(cc.Prefab)
    equipmentItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    contentNode: cc.Node = null;

    equipmentType: string = null;
    equipmentList: Equipment[] = [];
    equipmentItemPrefabNodeList: cc.Node[] = [];
    equipmentItemPrefabComponentList: EquipmentItemPrefabComponent[] = [];
    userEquipmentItemLinePrefabComponent: UserEquipmentItemLinePrefabComponent = null;

    equipmentSelected: Equipment[] = [];
    defaultEquipmentSelected: Equipment[] = [];

    selectNumMax: number = 1;

    onCloseBtnClicked() {
        this.node.destroyAllChildren();
        this.node.destroy();
        this.userEquipmentItemLinePrefabComponent.onEquipmentChangeTabClosed();
    }

    onEquipBtnClicked() {
        // if equipment clickable
        this.userEquipmentItemLinePrefabComponent.equipChanged();
        this.onCloseBtnClicked();
    }

    itemClicked(equipment: Equipment, component: EquipmentItemPrefabComponent) {
        if (this.equipmentSelected.includes(equipment)) {
            this.equipmentSelected.splice(this.equipmentSelected.indexOf(equipment), 1)
            component.itemUnselectd();
        } else {
            if (this.selectNumMax <= this.equipmentSelected.length) {
                return;
            } else {
                this.equipmentSelected.push(equipment);
                component.itemSelected();
            }
        }
        // change equipBtn status;
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // this.equipmentList = Item.getEquipmentListByType(this.type);
        this.equipmentList = [
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'}),
        ];
        if (this.equipmentList.length > 0) {
            this.equipmentList.forEach(equipment => {
                let equipmentItemPrefabNode = cc.instantiate(this.equipmentItemPrefab)
                this.equipmentItemPrefabNodeList.push(equipmentItemPrefabNode)
                let equipmentItemComponent = equipmentItemPrefabNode.getComponent('equipmentItemPrefab')
                this.equipmentItemPrefabComponentList.push(equipmentItemComponent);
                equipmentItemComponent.parentComponent = this
                equipmentItemComponent.equipment = equipment;
                if (equipment.isEquiped) {
                    equipmentItemComponent.selected = true;
                    this.equipmentSelected.push(equipment);
                }
                this.contentNode.addChild(equipmentItemPrefabNode);
            })
        }
        this.defaultEquipmentSelected = [...this.equipmentSelected];
    }

    start () {

    }

    // update (dt) {}
}
