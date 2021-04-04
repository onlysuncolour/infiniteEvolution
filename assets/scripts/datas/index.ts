import Item from './item'
import {GlobalMap} from './map'
import research from './research'
import Timer from './timer'
import {User} from './user'

export const Data = {
    loadGame: function loadGame() {
        let [
            user
        ] = [
            cc.sys.localStorage.getItem('user')
        ]
        User.setUser(user); 
    },
    newGame:function newGame(accountName: string) {
        cc.sys.localStorage.removeItem('user')
        cc.sys.localStorage.removeItem('item')
        cc.sys.localStorage.removeItem('map')
        cc.sys.localStorage.removeItem('research')
        cc.sys.localStorage.removeItem('timer')
        User.init(accountName)
    },
}

export const loadPlayer = User.loadPlayer.bind(User);
