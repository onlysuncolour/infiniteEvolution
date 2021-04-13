// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import item from "../../basic/item";
import BackpackPrefabComponent from "./backpackPrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemPrefabComponent extends cc.Component {

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    itemSpriteAtlas: cc.SpriteAtlas = null;

    item: item = null;

    backpackPrefabComponent: BackpackPrefabComponent;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.itemSprite.spriteFrame = this.itemSpriteAtlas.getSpriteFrame(this.item.texture)
    }

    start () {

    }

    // update (dt) {}
}
