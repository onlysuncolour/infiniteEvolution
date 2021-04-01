// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameActionPrefabComponent from "./gameActionPrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WorldInfoPrefabComponent extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    gameActionPrefabComponent : GameActionPrefabComponent = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.setPosition(200,360)
    }

    start () {

    }

    // update (dt) {}
}
