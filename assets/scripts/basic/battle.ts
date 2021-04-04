import { loadPlayer } from "../datas";
import { Enemy } from "./enemy";
import { Equipment } from "./equipment";
import { Player } from "./player";
import { Skill } from "./skill";
import { GlobalEvent } from "../libs/events";
// import {Environment} from 

export interface IAttackInfo {
    damage: number,
    damageType: string,
    buff?: string,
    target: boolean, // true enemy, false player
}

export interface IAttackResult {
    damageResult : number;
    damageType: string;
    buff? : string,
    target: boolean,
}

export class Battle {
    private _player: Player;
    private _enemy: Enemy;
    private _environment: object;
    private _enemySkills: Skill[];
    private _enemyItems: string[];
    private _enemyEquipment: Equipment[];
	private _enemyAttackTimeInterval: number;
	private _enemyAttackTimeOutFunc: ReturnType<typeof setTimeout>;
    private _playerSkills: Skill[];
    private _playerEquipment: Equipment[];
    private _playerItems: string[];
	private _playerAttackTimeInterval: number;
	private _playerAttackTimeOutFunc: ReturnType<typeof setTimeout>;
	private _battleStatus : string;

	get player() {
	  return this._player
	}
	
	set player(val: Player) {
	  this._player = val
	}
	
	get enemy() {
	  return this._enemy
	}
	
	set enemy(val: Enemy) {
	  this._enemy = val
	}
	
	get environment() {
	  return this._environment
	}
	
	set environment(val: object) {
	  this._environment = val
	}
	
	get enemySkills() {
	  return this._enemySkills
	}
	
	set enemySkills(val: Skill[]) {
	  this._enemySkills = val
	}
	
	get enemyItems() {
	  return this._enemyItems
	}
	
	set enemyItems(val: string[]) {
	  this._enemyItems = val
	}
	
	get enemyEquipment() {
	  return this._enemyEquipment
	}
	
	set enemyEquipment(val: Equipment[]) {
	  this._enemyEquipment = val
	}
	
	get enemyAttackTimeInterval() {
	  return this._enemyAttackTimeInterval
	}
	
	set enemyAttackTimeInterval(val: number) {
	  this._enemyAttackTimeInterval = val
	}
	
	get enemyAttackTimeOutFunc() {
	  return this._enemyAttackTimeOutFunc
	}
	
	set enemyAttackTimeOutFunc(val: ReturnType<typeof setTimeout>) {
	  this._enemyAttackTimeOutFunc = val
	}
	
	get playerSkills() {
	  return this._playerSkills
	}
	
	set playerSkills(val: Skill[]) {
	  this._playerSkills = val
	}
	
	get playerEquipment() {
	  return this._playerEquipment
	}
	
	set playerEquipment(val: Equipment[]) {
	  this._playerEquipment = val
	}
	
	get playerItems() {
	  return this._playerItems
	}
	
	set playerItems(val: string[]) {
	  this._playerItems = val
	}
	
	get playerAttackTimeInterval() {
	  return this._playerAttackTimeInterval
	}
	
	set playerAttackTimeInterval(val: number) {
	  this._playerAttackTimeInterval = val
	}
	
	get playerAttackTimeOutFunc() {
	  return this._playerAttackTimeOutFunc
	}
	
	set playerAttackTimeOutFunc(val: ReturnType<typeof setTimeout>) {
	  this._playerAttackTimeOutFunc = val
	}

	get battleStatus() {
	  return this._battleStatus
	}
	
	set battleStatus(val: string) {
	  this._battleStatus = val
	}

    /**
     *
     */
    constructor(enemy: Enemy, environment?: object) {
        // super();
        this.player = loadPlayer();
		this.player.currentHp = this.player.hp;
        this.enemy = enemy;
        this.environment = environment;

        this.enemySkills = Skill.buildSkillsById(this.enemy.skills)
        this.playerSkills = Skill.buildSkillsById(this.player.skills)

		this.playerAttackTimeInterval = 1000;
		this.enemyAttackTimeInterval = 1000;

		this.battleStatus = 'running';

        this.runAutoAttack()
    }

    runAutoAttack():void {
		let _this = this;
		let runPlayerAutoAttack = () => {
			if (_this.battleStatus == 'finished') {
				return;
			}
			_this.playerAttackTimeOutFunc = setTimeout( _ => {
				_this.playerAttack();
				runPlayerAutoAttack();
			}, _this.playerAttackTimeInterval)
		}
		let runEnemyAutoAttack = () => {
			if (_this.battleStatus == 'finished') {
				return;
			}
			_this.enemyAttackTimeOutFunc = setTimeout( _ => {
				_this.enemyAttack();
				runEnemyAutoAttack();
			}, _this.enemyAttackTimeInterval)
		}
		runPlayerAutoAttack();
		runEnemyAutoAttack();
    }
    
    public playerAttack() {
        const source = false;
        let attackInfos = this.getAttackInfo(source);
		const attackResults:IAttackResult[] = this.damageCalc(attackInfos)
		GlobalEvent.emit('playerAttack', attackResults )
    }

    public playerClickAttack() : IAttackResult[] {
		if (this.battleStatus == 'finished') {
			return [];
		}
        return this.damageCalc( [
            {
                damage: this.player.attack, 
                damageType: 'normal', 
                target: true
            }
        ])
    }
    
    public enemyAttack(){
        const source = true
        let attackInfos = this.getAttackInfo(source);
		const attackResults:IAttackResult[] = this.damageCalc(attackInfos)
		GlobalEvent.emit('enemyAttack', attackResults )
    }

    public itemUse() {

    }

    public weaponChange() {

    }

    private weaponAttack(source: boolean) : IAttackInfo[] {
        const unit = this.getUnitInfo(source).unit
        return [{
            damage: unit.attack,
            damageType: 'normal',
            target: !source
        }]
    }

    private skillAttack(source: boolean) : IAttackInfo[] {
        const sourceInfo = this.getUnitInfo(source)
        let skill:Skill = Skill.skillChoose(sourceInfo.skills, sourceInfo.unit);
        let skillAttackInfos:IAttackInfo[] = Skill.calcDamages(skill, source, sourceInfo.unit)
        return skillAttackInfos
    }

    private normalAttack(source: boolean) : IAttackInfo[] {
        const unit = this.getUnitInfo(source).unit
        return [{
            damage: unit.attack,
            damageType: 'normal',
            target: !source
        }]
    }

    private damageCalc(attackInfos: IAttackInfo[]) : IAttackResult[]{
        let result : IAttackResult[] = [];
        attackInfos.forEach(info => {
            let targetInfo = this.getUnitInfo(info.target);
            let sourceInfo = this.getUnitInfo(!info.target)
            let damageResult : number = 0;
            if (info.damageType == 'normal') {
                damageResult = Math.ceil(
                    info.damage * 
                    (sourceInfo.unit.attack / 
                        (sourceInfo.unit.attack + targetInfo.unit.attack)
                ))
                targetInfo.unit.currentHp -= damageResult;
            }
            result.push({
                damageResult,
                damageType: info.damageType,
                target: info.target
            })
        })
		if (this.enemy.currentHp <= 0) {
			this.enemyEliminated();
		}
        return result;
    }

    private getAttackInfo(source: boolean) : IAttackInfo[] {
        // normal attack, or skill
        // default 30% skill attack
        // then if weapon, weapon attack
        let attackInfos : IAttackInfo[];
        let sourceInfo = this.getUnitInfo(source);
        let rate = Math.random();
        if (rate < 0.3 && sourceInfo.skills.length > 0) {
            attackInfos = this.skillAttack(source)
        } else {
            if (sourceInfo.weaponAvailable) {
                attackInfos = this.weaponAttack(source)
            } else {
                attackInfos = this.normalAttack(source)
            }
        }
        return attackInfos;
    }

    private getUnitInfo(unitCode: boolean) : {skills : Skill[], equipments: Equipment[], unit: Player | Enemy, weaponAvailable: boolean} {
        let skills : Skill[] = this.playerSkills, 
            equipments: Equipment[] = this.playerEquipment,
            unit: Player | Enemy = this.player,
            weaponAvailable: boolean;
        if (unitCode) {
            skills = this.enemySkills;
            equipments = this.enemyEquipment,
            unit = this.enemy;
        }
        weaponAvailable = Battle.checkWeaponAvailable(equipments)
        return {
            skills,
            equipments,
            unit,
            weaponAvailable
        }
    }

    private statusChange() {

    }

    private statusEffect() {

    }

    private enemyEliminated() {
		GlobalEvent.emit('enemyEliminated', { enemy: this.enemy });
		this.destroy()
    }

	private destroy() {
		clearTimeout(this.enemyAttackTimeOutFunc);
		clearTimeout(this.playerAttackTimeOutFunc);
		for (const key in this) {
			if (Object.prototype.hasOwnProperty.call(this, key)) {
				this[key] = null
			}
		}
		this.battleStatus = 'finished'
	}

    static checkWeaponAvailable (equipments: Equipment[]) : boolean {
        return true
    }
}