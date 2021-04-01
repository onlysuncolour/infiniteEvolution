// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { IAttackResult } from "../../basic/battle";
import { Enemy } from "../../basic/enemy";
import { GlobalEvent } from "../../libs/events";
import GameActionPrefabComponent from './gameActionPrefab'
const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyTabPrefab extends cc.Component {

    @property(cc.Label)
    enemyNameLabelNode: cc.Label = null;

    @property(cc.Label)
    enemyHPLabelNode: cc.Label = null;

    @property(cc.Sprite)
    enemySpriteNode: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    enemySpriteAtlas: cc.SpriteAtlas = null;

    @property(cc.Prefab)
    enemyHPLostLabelPrefab: cc.Prefab = null;

    enemy: Enemy;

    gameActionPrefabComponent: GameActionPrefabComponent = null;

    setEnemy(enemy: Enemy) {
        this.enemy = enemy;
        this.enemySpriteNode.spriteFrame = this.enemySpriteAtlas.getSpriteFrame(enemy.texture)
        this.enemyNameLabelNode.string = enemy.name
        this.setEnemyHpLabel()
        this.node.on(cc.Node.EventType.MOUSE_UP, this.gameActionPrefabComponent.clickAttackEnemy.bind(this.gameActionPrefabComponent))
    }

    setEnemyHpLabel() {
        this.enemyHPLabelNode.string = `${this.enemy.currentHp}/${this.enemy.hp}`
    }

    onAttacked(attackResults : IAttackResult[]) {
        let damage = 0;
        attackResults.forEach(r => damage+=r.damageResult);
        var damageLabelNode = cc.instantiate(this.enemyHPLostLabelPrefab);
        this.node.addChild(damageLabelNode)
        damageLabelNode.setPosition(this.calcDamageLabelNodePosition(damageLabelNode))

        damageLabelNode.getComponent(cc.Label).string = `-${damage}`;
        setTimeout(_ => {
            damageLabelNode.destroy();
        }, 500)
        this.setEnemyHpLabel();
    }

    calcDamageLabelNodePosition(damageLabelNode: cc.Node) {
        let currentNodeP = {
            x: this.node.width,
            y: this.node.height
        };
        let damageLabelNodeWH = {
            w: damageLabelNode.width,
            h: damageLabelNode.height
        }
        let rand = {
            x: Math.random(),
            y: Math.random()
        }
        let p = cc.v2(
            (currentNodeP.x - damageLabelNodeWH.w)*rand.x - currentNodeP.x/2,
            (currentNodeP.y - damageLabelNodeWH.h)*rand.y - currentNodeP.y/2,
        )
        return p

    }

    onEliminated() {
        this.node.off(cc.Node.EventType.MOUSE_UP)
    }

    // LIFE-CYCLE CALLBACKS:

    start () {

    }

    // update (dt) {}
}
