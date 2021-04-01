import { loadPlayer } from "../datas";
import { Enemy } from "./enemy";
import { Equipment } from "./equipment";
import { Player } from "./player";
import { Skill } from "./skill";
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
    private _playerSkills: Skill[];
    private _playerEquipment: Equipment[];
    private _playerItems: string[];

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

    /**
     *
     */
    constructor(enemy: Enemy, environment?: object) {
        // super();
        this.player = loadPlayer();
        this.enemy = enemy;
        this.environment = environment;

        this.enemySkills = Skill.buildSkillsById(this.enemy.skills)
        this.playerSkills = Skill.buildSkillsById(this.player.skills)

    }
    
    public playerAttack() : IAttackResult[] {
        const source = false;
        let attackInfos = this.getAttackInfo(source);
        return this.damageCalc(attackInfos)
    }

    public playerClickAttack() : IAttackResult[] {
        return this.damageCalc( [
            {
                damage: this.player.attack, 
                damageType: 'normal', 
                target: true
            }
        ])
    }
    
    public enemyAttack() : IAttackResult[] {
        const source = true
        let attackInfos = this.getAttackInfo(source);
        return this.damageCalc(attackInfos)
    }

    public itemUse() {

    }

    public weaponChange() {

    }

    private weaponAttack(source: boolean) : IAttackInfo[] {
        const sourceO = this.getSourceInfo(source).sourceO
        return [{
            damage: sourceO.attack,
            damageType: 'normal',
            target: !source
        }]
    }

    private skillAttack(source: boolean) : IAttackInfo[] {
        const sourceInfo = this.getSourceInfo(source)
        let skill:Skill = Skill.skillChoose(sourceInfo.skills, sourceInfo.sourceO);
        let skillAttackInfos:IAttackInfo[] = Skill.calcDamages(skill, source, sourceInfo.sourceO)
        return skillAttackInfos
    }

    private normalAttack(source: boolean) : IAttackInfo[] {
        const sourceO = this.getSourceInfo(source).sourceO
        return [{
            damage: sourceO.attack,
            damageType: 'normal',
            target: !source
        }]
    }

    private damageCalc(attackInfos: IAttackInfo[]) : IAttackResult[]{
        let result : IAttackResult[] = [];
        attackInfos.forEach(info => {
            let targetInfo = this.getSourceInfo(info.target);
            let sourceInfo = this.getSourceInfo(!info.target)
            let damageResult : number = 0;
            if (info.damageType == 'normal') {
                damageResult = Math.ceil(
                    info.damage * 
                    (sourceInfo.sourceO.attack / 
                        (sourceInfo.sourceO.attack + targetInfo.sourceO.attack)
                ))
                targetInfo.sourceO.currentHp -= damageResult;
            }
            result.push({
                damageResult,
                damageType: info.damageType,
                target: info.target
            })
        })
        return result;
    }

    private getAttackInfo(source: boolean) : IAttackInfo[] {
        // normal attack, or skill
        // default 30% skill attack
        // then if weapon, weapon attack
        let attackInfos : IAttackInfo[];
        let sourceInfo = this.getSourceInfo(source);
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

    private getSourceInfo(source: boolean) : {skills : Skill[], equipments: Equipment[], sourceO: Player | Enemy, weaponAvailable: boolean} {
        let skills : Skill[] = this.playerSkills, 
            equipments: Equipment[] = this.playerEquipment,
            sourceO: Player | Enemy = this.player,
            weaponAvailable: boolean;
        if (source) {
            skills = this.enemySkills;
            equipments = this.enemyEquipment,
            sourceO = this.enemy;
        }
        weaponAvailable = Battle.checkWeaponAvailable(equipments)
        return {
            skills,
            equipments,
            sourceO,
            weaponAvailable
        }
    }

    private statusChange() {

    }

    private statusEffect() {

    }

    private enemyEliminated() {

    }

    static checkWeaponAvailable (equipments: Equipment[]) : boolean {
        return true
    }
    
}