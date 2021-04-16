// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import GameComponent from './game'

@ccclass
export default class MenuPrefabComponent extends cc.Component {
    
    @property(cc.Button)
    userBtn: cc.Button = null;

    @property(cc.Button)
    bagBtn: cc.Button = null;
    
    @property(cc.Button)
    partnerBtn: cc.Button = null;

    @property(cc.Button)
    watchBtn: cc.Button = null;

    @property(cc.Button)
    socialBtn: cc.Button = null;

    gameComponent: GameComponent;
    // LIFE-CYCLE CALLBACKS:

    onBagBtnClicked() {
        this.gameComponent.openBag();
    }
    
    onUserBtnClicked() {
        this.gameComponent.openUserTab();
    }

    onLoad () {

    }

    start () {

    }

    // update (dt) {}
}
