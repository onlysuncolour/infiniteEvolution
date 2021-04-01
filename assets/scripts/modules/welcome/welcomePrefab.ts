// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import WelcomeComponent from "./welcome"

@ccclass
export default class WelcomePrefabComponent extends cc.Component {

    @property(cc.Button)
    loadGameBtn: cc.Button = null;
    
    welcomeComponent: WelcomeComponent;

    newGameBtnOnClick() {
        this.welcomeComponent.newGame();
    }

    loadGameBtnOnClick() {
        this.welcomeComponent.loadGame();
    }
    onLoad () {
        let account = cc.sys.localStorage.getItem('user')
        if (!account) {
            this.loadGameBtn.interactable = false
        }
    }

    start () {

    }

    // update (dt) {}
}
