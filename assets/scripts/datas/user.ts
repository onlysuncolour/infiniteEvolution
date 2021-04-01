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
                skills: [],
                defense: 10
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