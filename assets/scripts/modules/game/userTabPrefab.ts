// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameComponent from "./game";
import UserAttributeTabPrefabComopnent from "./userAttributeTabPrefab";
import UserEquipmentTabPrefabComopnent from "./userEquipmentTabPrefabComopnent";
import UserSkillTabPrefabComopnent from "./userSkillTabPrefabComopnent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserTabPrefabComopnent extends cc.Component {
    @property(cc.Button)
    closeBtn: cc.Button = null;
    @property(cc.Node)
    contentNode: cc.Node = null;

    @property(cc.Label)
    userAttributeLabel: cc.Label = null;
    @property(cc.Label)
    userEquipmentLabel: cc.Label = null;
    @property(cc.Label)
    userSkillLabel: cc.Label = null;

    @property(cc.Prefab)
    userAttributeTabPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    userEquipmentTabPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    userSkillTabPrefab: cc.Prefab = null;

    userAttributeTabPrefabNode: cc.Node = null;
    userEquipmentTabPrefabNode: cc.Node = null;
    userSkillTabPrefabNode: cc.Node = null;
    
    userAttributeTabPrefabComopnent: UserAttributeTabPrefabComopnent = null;
    userEquipmentTabPrefabComopnent: UserEquipmentTabPrefabComopnent = null;
    userSkillTabPrefabComopnent: UserSkillTabPrefabComopnent = null;

    gameComponent: GameComponent = null;
    currentType: string = null;

    labels: cc.Label[];

    onCloseBtnClicked() {
        this.node.destroyAllChildren();
        this.node.destroy();
        this.gameComponent.menuPadClosed('userTab');
    }

    changeType(eventType, type: string) {
        let label: cc.Label = this[`${type}Label`]
        this.labels.forEach(l => 
            l.node.color = l == label ? l.node.color = new cc.Color(120, 0, 0) : l.node.color = new cc.Color(80, 80, 80)
        )
        if (this.currentType) {
            this[`${this.currentType}TabPrefabComopnent`] = null
            this[`${this.currentType}TabPrefabNode`] = null
            this.contentNode.destroyAllChildren();
        }
        let currentNode = cc.instantiate(this[`${type}TabPrefab`]);
        let currentComponent = currentNode.getComponent(`${type}TabPrefab`)
        this.node.addChild(currentNode)
        currentComponent.userTabPrefabComponent = this;
        this.currentType = type;
        this[`${this.currentType}TabPrefabNode`] = currentNode
        this[`${this.currentType}TabPrefabComopnent`] = currentComponent
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.labels = [this.userAttributeLabel, this.userEquipmentLabel, this.userSkillLabel];
        this.changeType(null, 'userAttribute');
    }

    start () {

    }

    // update (dt) {}
}
