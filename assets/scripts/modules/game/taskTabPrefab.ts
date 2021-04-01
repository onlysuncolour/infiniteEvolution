// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import GameComponent from './game'
@ccclass
export default class TaskTabPrefabComponent extends cc.Component {

    @property(cc.Prefab)
    taskPrefab: cc.Prefab = null;

    @property(cc.Node)
    contentNode: cc.Node = null;

    gameComponent: GameComponent;

    taskList: cc.Node[] = [];

    addTask () {
        let taskNode = cc.instantiate(this.taskPrefab)
        this.taskList.push(taskNode)
        taskNode.getComponent('taskPrefab').taskTabComponent = this;
        taskNode.getComponent('taskPrefab').changeContent(`no.${this.taskList.length } task`);
        this.contentNode.addChild(taskNode);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
