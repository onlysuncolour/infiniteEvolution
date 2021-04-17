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

    @property(cc.Graphics)
    borderGraphics: cc.Graphics = null;

    item: item = null;

    backpackPrefabComponent: BackpackPrefabComponent;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.itemSprite.spriteFrame = this.itemSpriteAtlas.getSpriteFrame(this.item.texture)
        // this.borderGraphics.rect(-20, -20, 40, 40);
        // this.borderGraphics.stroke();
        // this.borderGraphics.lineWidth = 2;
        // this.borderGraphics.fillColor = cc.Color.GREEN;
        // this.borderGraphics.fill();
    }

    start () {

    }

    // update (dt) {}
}
