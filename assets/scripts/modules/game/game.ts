// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameActionPrefabComponent from "./gameActionPrefab";
import TaskTabPrefabComponent from "./taskTabPrefab";
import BackpackPrefabComponent from "./backpackPrefab"
import MenuPrefabComponent from "./menuPrefab";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameComponent extends cc.Component {

    @property(cc.Prefab)
    menuPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    taskTabPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    gameActionPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    backpackPrefab: cc.Prefab = null;

    menuNode: cc.Node = null;
    taskTabNode: cc.Node = null;
    gameActionNode: cc.Node = null;
    backpackNode: cc.Node = null;

    menuPrefabComponent: MenuPrefabComponent = null;
    taskTabPrefabComponent: TaskTabPrefabComponent = null;
    gameActionPrefabComponent: GameActionPrefabComponent = null;
    backpackPrefabComponent: BackpackPrefabComponent = null

    menuPadClosed(menu: string) {
        this[`${menu}Node`] = null
        this[`${menu}PrefabComponent`] = null
    }
    
    openBag() {
        this.backpackNode = cc.instantiate(this.backpackPrefab)
        this.node.addChild(this.backpackNode)
        this.backpackPrefabComponent = this.backpackNode.getComponent('backpackPrefab')
        this.backpackPrefabComponent.gameComponent = this;
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.menuNode = cc.instantiate(this.menuPrefab)
        this.node.addChild(this.menuNode)
        this.menuPrefabComponent = this.menuNode.getComponent('menuPrefab')
        this.menuPrefabComponent.gameComponent = this;

        this.taskTabNode = cc.instantiate(this.taskTabPrefab)
        this.node.addChild(this.taskTabNode);
        this.taskTabPrefabComponent = this.taskTabNode.getComponent('taskTabPrefab')
        this.taskTabPrefabComponent.gameComponent = this;
        
        this.gameActionNode = cc.instantiate(this.gameActionPrefab)
        this.node.addChild(this.gameActionNode);
        this.gameActionPrefabComponent = this.gameActionNode.getComponent('gameActionPrefab')
        this.gameActionPrefabComponent.gameComponent = this;
    }

    start () {

    }

    // update (dt) {}
}
