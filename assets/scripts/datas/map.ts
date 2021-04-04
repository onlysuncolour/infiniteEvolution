import { Enemy } from '../basic/enemy'
import Utils from '../libs/utils'

export interface IMapInteractivation {
    type: string,
    info: Enemy
}
export interface IMapSave {
    [propName: string]: any;
}
export class MapData {
    public Save: IMapSave = {};
    public currentMapInteractivation: IMapInteractivation;

    getNextMapInteractivation(): {type: string, info: Enemy} {
        this.currentMapInteractivation = {
            type: 'enemy',
            info: this.getEnemy()
        }
        return this.currentMapInteractivation;
    }

    getEnemy(): Enemy {
        let id = Math.floor(Math.random()*8)
        return Enemy.initEnemy(id);
    }

    resetEnemy() {
        if (this.currentMapInteractivation.type == 'enemy') {
            this.currentMapInteractivation.info.currentHp = this.currentMapInteractivation.info.hp;
        }
    }
}

export const GlobalMap = new MapData();