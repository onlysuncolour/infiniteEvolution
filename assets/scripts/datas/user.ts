import { Player } from "../basic/player";
import { initItems } from './index'
interface ISaveUser {
    accountName: string;
    player: Player
}

export const UserData = {
    Save: {},
    setUser: function (user) {
        this.Save = {
            accountName: user.accountName,
            player: Player.initPlayer(user.player)
        };
        initItems(user.player.items)
    },
    init: function (accountName: string) {
        let user = {
            accountName,
            player: Player.initPlayer({
                hp: 100,
                attack: 10,
                skills: [0,1,2],
                defense: 10,
                items: [
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                    {name: 1, texture: 'weapon1', type: 'equipment'},
                ]
            })
        }
        this.setUser(user)
    },
    loadPlayer() : Player {
        return this.Save.player;
    },
    setPlayerSkills() {

    },
    setPlayerEquipment() {

    },
    setPlayerItems() {

    }
}