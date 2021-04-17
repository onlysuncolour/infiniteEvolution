// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UserEquipmentItemLinePrefabComponent from "./userEquipmentItemLinePrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserEquipmentItemPrefabComponent extends cc.Component {

    @property(cc.Sprite)
    item: cc.Sprite = null;

    userEquipmentItemLinePrefabComponent: UserEquipmentItemLinePrefabComponent = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
