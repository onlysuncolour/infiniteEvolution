// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Data } from "../../datas";

const {ccclass, property} = cc._decorator;
@ccclass
export default class WelcomeComponent extends cc.Component {

    /*
        进入游戏方式选择：
            新游戏
            加载游戏
    */

    @property(cc.Prefab)
    public welcomePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    public loadingPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    public newGamePrefab: cc.Prefab = null;

    newGameNode: cc.Node = null;
    welcomeNode: cc.Node = null;

    newGame() {
        this.newGameNode = cc.instantiate(this.newGamePrefab);
        this.welcomeNode.addChild(this.newGameNode)
        this.newGameNode.getComponent('newGamePrefab').welcomeComponent = this;
    }

    loadGame() {
        Data.loadGame()
        cc.director.loadScene('game')
    }

    runNewGame(accountName: string) {
        Data.newGame(accountName);
        cc.director.loadScene('game')
    }

    onLoad() {
        this.welcomeNode = cc.instantiate(this.welcomePrefab)
        this.node.addChild(this.welcomeNode)
        this.welcomeNode.getComponent('welcomePrefab').welcomeComponent = this;
    }

    start () {

    }

    // update (dt) {}
}
