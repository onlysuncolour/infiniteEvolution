// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { IAttackResult } from "../../basic/battle";
import { Player } from "../../basic/player";
import { loadPlayer } from "../../datas";
import GameActionPrefabComponent from "./gameActionPrefab";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerTabPrefabComponent extends cc.Component {

    @property(cc.Label)
    playerHPLabel: cc.Label = null;

    @property(cc.Sprite)
    playerSprite: cc.Sprite = null;

    player: Player;
    
    gameActionPrefabComponent: GameActionPrefabComponent = null;

    onAttacked(attackResults : IAttackResult[]) {
        let damage = 0;
        attackResults.forEach(r => damage+=r.damageResult);
        // var damageLabelNode = cc.instantiate(this.enemyHPLostLabelPrefab);
        // this.node.addChild(damageLabelNode)
        // damageLabelNode.setPosition(this.calcDamageLabelNodePosition(damageLabelNode))

        // damageLabelNode.getComponent(cc.Label).string = `-${damage}`;
        // setTimeout(_ => {
        //     damageLabelNode.destroy();
        // }, 500)
        this.setPlayerHpLabel();
    }

    setPlayerHpLabel() {
        this.playerHPLabel.string = `${this.player.currentHp}/${this.player.hp}`
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = loadPlayer()
        this.setPlayerHpLabel()
    }

    start () {

    }

    // update (dt) {}
}
