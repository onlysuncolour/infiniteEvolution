// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UserEquipmentChangeTabPrefabComponent from "./userEquipmentChangeTabPrefab";
import UserEquipmentItemPrefabComponent from "./userEquipmentItemPrefab";
import UserEquipmentTabPrefabComopnent from "./userEquipmentTabPrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserEquipmentItemLinePrefabComponent extends cc.Component {

    @property(cc.Label)
    equipmentTypeLabel: cc.Label = null;

    @property(cc.Button)
    changeEquipmentBtn: cc.Button = null;

    @property(cc.Prefab)
    userEquipmentItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    userEquipmentChangeTabPrefab: cc.Prefab = null;

    userEquipmentItemPrefabNodeList: cc.Node[] = [];
    userEquipmentItemPrefabComponentList: UserEquipmentItemPrefabComponent[] = [];

    userEquipmentChangeTabPrefabNode: cc.Node = null;
    userEquipmentChangeTabPrefabComponent: UserEquipmentChangeTabPrefabComponent = null;
    userEquipmentTabPrefabComponent: UserEquipmentTabPrefabComopnent = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
