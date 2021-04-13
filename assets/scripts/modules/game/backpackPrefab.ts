// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Item from "../../basic/item";
import { Player } from "../../basic/player";
import { loadPlayer } from "../../datas";
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

    itemNodeList: cc.Node[] = [];

    itemPrefabComponentList: ItemPrefabComponet[] = [];

    gameComponent: GameComponent = null;

    player: Player = null;

    onCloseBtnClicked() {
        this.node.destroyAllChildren();
        this.node.destroy();
        this.gameComponent.menuPadClosed('backpack');
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = loadPlayer();
        if (this.player.items) {
            this.player.items.forEach(i => {
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

    start () {

    }

    // update (dt) {}
}
