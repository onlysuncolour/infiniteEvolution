import Basic from "./basic";

export class Player extends Basic {
    private _hp: number;
    private _defense: number;
    private _attack: number;
    private _skills: number[];
    private _currentHp: number;
    private _strength: number;

    get hp() {
      return this._hp
    }
    
    set hp(val: number) {
      this._hp = val
    }
    
    get defense() {
      return this._defense
    }
    
    set defense(val: number) {
      this._defense = val
    }
    
    get attack() {
      return this._attack
    }
    
    set attack(val: number) {
      this._attack = val
    }
    
    get skills() {
      return this._skills
    }
    
    set skills(val: number[]) {
      this._skills = val
    }
    
    get currentHp() {
      return this._currentHp
    }
    
    set currentHp(val: number) {
      this._currentHp = val
    }
    
    get strength() {
      return this._strength
    }
    
    set strength(val: number) {
      this._strength = val
    }


    /**
     *
     */
    constructor(data) {
        super(data);
    }

    static initPlayer(data) : Player {
        const player = new Player(data)
        return player
    }
}