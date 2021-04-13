import { Player } from "../basic/player";
interface ISaveUser {
    accountName: string;
    player: Player
}

export const User = {
    Save: {},
    setUser: function (user) {
        this.Save = {
            accountName: user.accountName,
            player: Player.initPlayer(user.player)
        };
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
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                    {name: 1, texture: 'weapon1'},
                ]
            })
        }
        this.Save = user;
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