import Basic from './basic';
import enemiesContent from '../content/enemy';

export class Enemy extends Basic {

    private _id: number;
    private _name: string;
    private _hp: number;
    private _atlas: string;
    private _texture: string;
    private _skills: number[];
    private _drops: number[];
    private _dropRate: number;
	private _currentHp: number;
    private _strength: number;
    private _attack: number;

    get id() {
      return this._id
    }
    
    set id(val: number) {
      this._id = val
    }
    
    get name() {
      return this._name
    }
    
    set name(val: string) {
      this._name = val
    }
    
    get hp() {
      return this._hp
    }
    
    set hp(val: number) {
      this._hp = val
    }
    
    get atlas() {
      return this._atlas
    }
    
    set atlas(val: string) {
      this._atlas = val
    }
    
    get texture() {
      return this._texture
    }
    
    set texture(val: string) {
      this._texture = val
    }
    
    get skills() {
      return this._skills
    }
    
    set skills(val: number[]) {
      this._skills = val
    }
    
    get drops() {
      return this._drops
    }
    
    set drops(val: number[]) {
      this._drops = val
    }
    
    get dropRate() {
      return this._dropRate
    }
    
    set dropRate(val: number) {
      this._dropRate = val
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
    
    get attack() {
      return this._attack
    }
    
    set attack(val: number) {
      this._attack = val
    }


    /**
     *
     */
    constructor(data) {
        super(data);
    }

    static initEnemy(id) : Enemy {
        let enemyData = enemiesContent.filter(i => i.id == id)[0]
        if (!enemyData) {
            enemyData = enemiesContent[0]
        }
        const enemy = new Enemy(enemyData)
		enemy.currentHp = enemy.hp
        return enemy
    }
}
