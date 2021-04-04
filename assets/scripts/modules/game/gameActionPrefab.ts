// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import EnemyTabPrefebComponent from './enemyTabPrefab'
import {GlobalMap, IMapInteractivation} from '../../datas/map';
import PlayerTabPrefabComponent from './playerTabPrefab';
import ClanTabPrefabComponent from './clanTabPrefab';
import PartyTabPrefabComponent from './partyTabPrefab';
import WorldInfoPrefabComponent from './worldInfoPrefab';
import { Battle, IAttackResult } from '../../basic/battle';
import { GlobalEvent } from '../../libs/events';

@ccclass
export default class GameActionPrefabComponent extends cc.Component {

    @property(cc.Prefab)
    enemyTabPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    playerTabPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    clanTabPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    partyTabPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    worldInfoPrefab: cc.Prefab = null;

    @property(cc.Button)
    mapBtnNode: cc.Button = null;

    @property(cc.Button)
    speedUpBtnNode: cc.Button = null;

    @property(cc.Button)
    systemBtnNode: cc.Button = null;

    @property(cc.Button)
    eventBtnNode: cc.Button = null;

    enemyTabPrefabNode: cc.Node = null;
    playerTabPrefabNode: cc.Node = null;
    clanTabPrefabNode: cc.Node = null;
    partyTabPrefabNode: cc.Node = null;
    worldInfoPrefabNode: cc.Node = null;
    
    enemyTabPrefebComponent: EnemyTabPrefebComponent = null;
    playerTabPrefebComponent: PlayerTabPrefabComponent = null;
    clanTabPrefebComponent: ClanTabPrefabComponent = null;
    partyTabPrefebComponent: PartyTabPrefabComponent = null;
    worldInfoPrefebComponent: WorldInfoPrefabComponent = null;

    battle: Battle = null;

    mapInteractivation: IMapInteractivation;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.mapInteractivation = GlobalMap.getNextMapInteractivation();
        this.runInteractivation()
        
        this.playerTabPrefabNode = cc.instantiate(this.playerTabPrefab)
        this.node.addChild(this.playerTabPrefabNode)
        this.playerTabPrefebComponent = this.playerTabPrefabNode.getComponent('playerTabPrefab')
        this.playerTabPrefebComponent.gameActionPrefabComponent = this;

        this.clanTabPrefabNode = cc.instantiate(this.clanTabPrefab)
        this.node.addChild(this.clanTabPrefabNode)
        this.clanTabPrefebComponent = this.clanTabPrefabNode.getComponent('clanTabPrefab')
        this.clanTabPrefebComponent.gameActionPrefabComponent = this;

        this.partyTabPrefabNode = cc.instantiate(this.partyTabPrefab)
        this.node.addChild(this.partyTabPrefabNode)
        this.partyTabPrefebComponent = this.partyTabPrefabNode.getComponent('partyTabPrefab')
        this.partyTabPrefebComponent.gameActionPrefabComponent = this;

        this.worldInfoPrefabNode = cc.instantiate(this.worldInfoPrefab)
        this.node.addChild(this.worldInfoPrefabNode)
        this.worldInfoPrefebComponent = this.worldInfoPrefabNode.getComponent('worldInfoPrefab')
        this.worldInfoPrefebComponent.gameActionPrefabComponent = this;
    }

    clickAttackEnemy() {
        let attackResults = this.battle.playerClickAttack();
        this.enemyTabPrefebComponent.onAttacked(attackResults)
    }

    playerAttack(attackResults : IAttackResult[]) {
        this.enemyTabPrefebComponent.onAttacked(attackResults);
    }

    enemyAttack(attackResults : IAttackResult[]) {
        this.playerTabPrefebComponent.onAttacked(attackResults)
    }

    runInteractivation() {
        this.destroyInteractivation()
        if (this.mapInteractivation.type == 'enemy') {
            this.enemyTabPrefabNode = cc.instantiate(this.enemyTabPrefab)
            this.node.addChild(this.enemyTabPrefabNode)
            this.enemyTabPrefebComponent = this.enemyTabPrefabNode.getComponent('enemyTabPrefab');
            this.enemyTabPrefebComponent.gameActionPrefabComponent = this;
            this.enemyTabPrefebComponent.setEnemy(this.mapInteractivation.info);
            this.battle = new Battle(this.mapInteractivation.info)
            GlobalEvent.on('enemyEliminated', this.enemyEliminated.bind(this))
            GlobalEvent.on('playerEliminated', this.playerEliminated.bind(this))
            GlobalEvent.on('playerAttack', this.playerAttack.bind(this))
            GlobalEvent.on('enemyAttack', this.enemyAttack.bind(this))
        }
    }

    destroyInteractivation() {
        GlobalEvent.off('playerAttack')
        GlobalEvent.off('enemyAttack')
		GlobalEvent.off('enemyEliminated');
		GlobalEvent.off('playerEliminated');
        if (this.enemyTabPrefabNode) {
            this.enemyTabPrefabNode.destroyAllChildren()
            this.enemyTabPrefabNode.destroy();
            this.enemyTabPrefabNode = null;
            this.enemyTabPrefebComponent = null;
        }
    }

    enemyEliminated() {
        this.mapInteractivation = GlobalMap.getNextMapInteractivation();
        this.runInteractivation();
    }

    playerEliminated() {
        if (this.mapInteractivation.type == 'enemy') {
            GlobalMap.resetEnemy();
            this.runInteractivation()
        }
    }

    start () {

    }

    // update (dt) {}
}
