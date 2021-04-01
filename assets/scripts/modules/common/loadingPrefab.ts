// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    public progressNode: cc.Node = null;

    @property(cc.Integer)
    public progressMax: number = 0;
    
    @property(cc.Integer)
    public speed: number = 300;

    status: LoadingStatus = null;
    currentTarget: number = 0;
    callbacks: {cb: Function, target: number}[] = [];
    /**
     *
     */
    constructor() {
        super();
    }

    setProgress(progress: number, callback?: Function) {
        this.currentTarget = this.progressMax * progress;
        this.status = LoadingStatus.Loading;
        if (callback) {
            this.callbacks.push({
                cb: callback,
                target: this.currentTarget
            })
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.progressNode.width = 0;
    }

    start () {

    }

    update (dt) {
        if (this.status == LoadingStatus.Loading) {
            this.progressNode.width += dt * this.speed;
            if (this.callbacks[0] && this.progressNode.width > this.callbacks[0].target) {
                let cb = this.callbacks[0].cb;
                this.callbacks.shift();
                cb();
            }
            if (this.progressNode.width >= this.currentTarget) {
                this.progressNode.width = this.currentTarget;
                if (this.currentTarget == this.progressMax) {
                    this.status = LoadingStatus.Finish;
                } else {
                    this.status = LoadingStatus.Pause;
                }
            } 
        }
    }
}

enum LoadingStatus {
    Pause= 0,
    Loading= 1,
    Finish = 2
}