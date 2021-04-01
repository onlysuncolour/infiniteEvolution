// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartComponent extends cc.Component {

    @property(cc.Prefab)
    loadingPrefab: cc.Prefab = null;
    
    loadingNode: cc.Node = null;

    onLoad () {
        setTimeout(function() {
            this.loadResource()
            // cc.director.loadScene('welcome')
        }.bind(this), 3000)
    }

    loadResource() {
        this.loadingNode = cc.instantiate(this.loadingPrefab)
        this.node.addChild(this.loadingNode)
        // download resource
        this.loadingNode.getComponent('loadingPrefab').setProgress(0.7, this.preload.bind(this));
    }
    
    goWelcome() {
        this.loadingNode.destroy();
        cc.director.loadScene('welcome')
    }

    preload() {
        cc.director.preloadScene('welcome', undefined, function() {
            this.loadingNode.getComponent('loadingPrefab').setProgress(1, this.goWelcome.bind(this));
        }.bind(this))
    }

    start () { }

    // update (dt) {}
}
