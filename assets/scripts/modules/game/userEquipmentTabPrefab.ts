// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UserEquipmentItemLinePrefabComponent from "./userEquipmentItemLinePrefab";
import UserTabPrefabComopnent from "./userTabPrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserEquipmentTabPrefabComopnent extends cc.Component {

    @property(cc.Node)
    contentNode: cc.Node = null;

    @property(cc.Prefab)
    userEquipmentItemLinePrefab: cc.Prefab = null;

    userEquipmentItemLineNodeList: cc.Node[] = [];
    userEquipmentItemLinePrefabComponentList: UserEquipmentItemLinePrefabComponent[] = [];

    userTabPrefabComponent: UserTabPrefabComopnent = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // let types:string[] = Item.getEquipmentTypes()
        let types:string[] = ['weapon'];
        types.forEach(type => {
            let lineNode = cc.instantiate(this.userEquipmentItemLinePrefab)
            let lineCompnent = lineNode.getComponent('userEquipmentItemLinePrefab')
            this.userEquipmentItemLineNodeList.push(lineNode);
            this.userEquipmentItemLinePrefabComponentList.push(lineCompnent)
            lineCompnent.userEquipmentTabPrefabComponent = this;
            lineCompnent.userEquipmentTabPrefabNode = this.node;
            lineCompnent.equipmentType = type;
            this.contentNode.addChild(lineNode)
        })
    }

    start () {

    }

    // update (dt) {}
}
