import { Enemy } from '../basic/enemy'
import Utils from '../libs/utils'

export const Map = {
    Save: {},
    getCurrentStatus(): {type: string, info: Enemy} {
        return {
            type: 'enemy',
            info: this.getEnemy()
        }
    },
    getEnemy(): Enemy {
        let id = Math.floor(Math.random()*8)
        return Enemy.initEnemy(id);
    }
}