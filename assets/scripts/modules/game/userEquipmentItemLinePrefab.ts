// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Equipment } from "../../basic/equipment";
import EquipmentItemPrefabComponent from "./equipmentItemPrefab";
import UserEquipmentChangeTabPrefabComponent from "./userEquipmentChangeTabPrefab";
import UserEquipmentTabPrefabComopnent from "./userEquipmentTabPrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class equipmentItemLinePrefabComponent extends cc.Component {

    @property(cc.Label)
    equipmentTypeLabel: cc.Label = null;

    @property(cc.Button)
    changeEquipmentBtn: cc.Button = null;

    @property(cc.Button)
    disarmEquipmentBtn: cc.Button = null;

    @property(cc.Node)
    contentNode: cc.Node = null;

    @property(cc.Prefab)
    equipmentItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    userEquipmentChangeTabPrefab: cc.Prefab = null;

    equipmentItemList: Equipment[] = [];
    equipmentItemPrefabNodeList: cc.Node[] = [];
    equipmentItemPrefabComponentList: EquipmentItemPrefabComponent[] = [];

    userEquipmentChangeTabPrefabNode: cc.Node = null;
    userEquipmentChangeTabPrefabComponent: UserEquipmentChangeTabPrefabComponent = null;
    userEquipmentTabPrefabComponent: UserEquipmentTabPrefabComopnent = null;
    userEquipmentTabPrefabNode: cc.Node = null;

    equipmentType: string;

    onChangeEquipmentBtnClicked() {
        this.userEquipmentChangeTabPrefabNode = cc.instantiate(this.userEquipmentChangeTabPrefab)
        this.userEquipmentChangeTabPrefabComponent = this.userEquipmentChangeTabPrefabNode.getComponent('userEquipmentChangeTabPrefab')
        this.userEquipmentChangeTabPrefabComponent.userEquipmentItemLinePrefabComponent = this
        this.userEquipmentChangeTabPrefabComponent.equipmentType = this.equipmentType;
        this.userEquipmentTabPrefabNode.addChild(this.userEquipmentChangeTabPrefabNode)
    }

    equipChanged() {
        this.setEquipments();
    }

    onEquipmentChangeTabClosed() {
        this.userEquipmentChangeTabPrefabNode = null;
        this.userEquipmentChangeTabPrefabComponent = null;
    }

    onDisarmEquipmentBtnClicked() {

    }

    setEquipments() {
        // this.equipmentItemList = Item.getEquipedEquipmentListByType(this.type)
        this.equipmentItemList = [
            new Equipment({name: 1, texture: 'weapon1', type: 'equipment'})
        ];
        this.contentNode.destroyAllChildren();
        this.equipmentItemPrefabComponentList = [];
        this.equipmentItemPrefabNodeList = [];
        if (this.equipmentItemList.length > 0) {
            this.equipmentItemList.forEach(equipment => {
                let equipmentItemPrefabNode = cc.instantiate(this.equipmentItemPrefab)
                this.equipmentItemPrefabNodeList.push(equipmentItemPrefabNode)
                let equipmentItemComponent = equipmentItemPrefabNode.getComponent('equipmentItemPrefab')
                this.equipmentItemPrefabComponentList.push(equipmentItemComponent);
                equipmentItemComponent.parentComponent = this
                equipmentItemComponent.equipment = equipment;
                this.contentNode.addChild(equipmentItemPrefabNode);
            })
        }
    }
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setEquipments();
        // this.equipmentTypeLabel.string = Dict.equipmentType[this.type] + ':'
        this.equipmentTypeLabel.string = '武器:'
    }

    start () {

    }

    // update (dt) {}
}
