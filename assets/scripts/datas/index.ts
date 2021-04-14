import {ItemData} from './item'
import {GlobalMap} from './map'
import research from './research'
import Timer from './timer'
import {UserData} from './user'

export const Data = {
    loadGame: function loadGame() {
        let [
            user
        ] = [
            cc.sys.localStorage.getItem('user')
        ]
        UserData.setUser(user); 
    },
    newGame:function newGame(accountName: string) {
        cc.sys.localStorage.removeItem('user')
        cc.sys.localStorage.removeItem('item')
        cc.sys.localStorage.removeItem('map')
        cc.sys.localStorage.removeItem('research')
        cc.sys.localStorage.removeItem('timer')
        UserData.init(accountName)
    },
}

export const loadPlayer = UserData.loadPlayer.bind(UserData);
export const loadItems = ItemData.loadItems.bind(ItemData);
export const initItems = ItemData.initItems.bind(ItemData);