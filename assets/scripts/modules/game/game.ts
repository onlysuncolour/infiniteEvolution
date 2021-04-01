// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameComponent extends cc.Component {

    @property(cc.Prefab)
    menuPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    taskTabPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    gameActionPrefab: cc.Prefab = null;

    menuNode: cc.Node = null;
    taskTabNode: cc.Node = null;
    gameActionNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.menuNode = cc.instantiate(this.menuPrefab)
        this.node.addChild(this.menuNode)
        this.menuNode.getComponent('menuPrefab').gameComponent = this;

        this.taskTabNode = cc.instantiate(this.taskTabPrefab)
        this.node.addChild(this.taskTabNode);
        this.taskTabNode.getComponent('taskTabPrefab').gameComponent = this;
        
        this.gameActionNode = cc.instantiate(this.gameActionPrefab)
        this.node.addChild(this.gameActionNode);
        this.gameActionNode.getComponent('gameActionPrefab').gameComponent = this;
    }

    start () {

    }

    // update (dt) {}
}
