// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Equipment } from "../../basic/equipment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EquipmentItemPrefabComponent extends cc.Component {

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    itemSpriteAtlas: cc.SpriteAtlas = null;

    @property(cc.Graphics)
    itemGraphics: cc.Graphics = null;

    equipment: Equipment = null;

    selected: Boolean = false;

    parentComponent: any = null;

    onItemClicked() {
        if (this.parentComponent.itemClicked) {
            this.parentComponent.itemClicked(this.equipment)
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.itemSprite.spriteFrame = this.itemSpriteAtlas.getSpriteFrame(this.equipment.texture);
        this.itemGraphics.rect(-20, -20, 40, 40);
        this.fillItemLevel();
        if (this.selected) {
            this.itemSelected();
        }
    }

    fillItemLevel() {
        this.itemGraphics.fillColor = cc.Color.GREEN;
        this.itemGraphics.fill();
    }
    
    itemSelected() {
        this.itemGraphics.lineWidth = 4;
        this.itemGraphics.strokeColor = cc.Color.RED;
        this.itemGraphics.stroke();
    }

    itemUnselectd() {
        this.itemGraphics.strokeColor = cc.Color.TRANSPARENT;
        this.itemGraphics.stroke();
    }

    start () {

    }

    // update (dt) {}
}
