// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Item from "../../basic/item";
import { Player } from "../../basic/player";
import { loadItems, loadPlayer } from "../../datas";
import GameComponent from "./game";
import ItemPrefabComponet from './itemPrefab'

const {ccclass, property} = cc._decorator;

@ccclass
export default class BackpackPrefabComponent extends cc.Component {

    @property(cc.Button)
    closeBtn: cc.Button = null;

    @property(cc.Node)
    contentNode: cc.Node = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Label)
    equipmentLabel: cc.Label = null;
    
    @property(cc.Label)
    questItemLabel: cc.Label = null;

    @property(cc.Label)
    otherItemLabel: cc.Label = null;

    itemNodeList: cc.Node[] = [];
    
    currentType: string = 'equipment';

    itemPrefabComponentList: ItemPrefabComponet[] = [];

    gameComponent: GameComponent = null;

    items: Item[] = [];

    onCloseBtnClicked() {
        this.node.destroyAllChildren();
        this.node.destroy();
        this.gameComponent.menuPadClosed('backpack');
    }

    changeType(eventType, type: string) {
        let label: cc.Label = {
            "equipment": this.equipmentLabel,
            "quest": this.questItemLabel,
            "other": this.otherItemLabel
        }[type]
        let labelArray = [this.equipmentLabel, this.questItemLabel, this.otherItemLabel]
        labelArray.forEach(l => {
            if (l == label) {
                l.node.color = new cc.Color(120, 0, 0)
            } else {
                l.node.color = new cc.Color(80, 80, 80)
            }
        })
        this.contentNode.destroyAllChildren();
        this.itemNodeList = [];
        this.itemPrefabComponentList = []
        if (this.items) {
            this.items.filter(i => i.type == type).forEach(i => {
                let item = new Item(i);
                let itemNode = cc.instantiate(this.itemPrefab)
                this.itemNodeList.push(itemNode)
                let itemPrefabComponent = itemNode.getComponent('itemPrefab')
                this.itemPrefabComponentList.push(itemPrefabComponent);
                itemPrefabComponent.backpackPrefabComponent = this
                itemPrefabComponent.item = item;
                this.contentNode.addChild(itemNode);
            })
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.items = loadItems()
        this.changeType(null, this.currentType);
    }

    start () {

    }

    // update (dt) {}
}
