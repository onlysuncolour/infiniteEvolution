import skillsContent from "../content/skill";
import { IAttackInfo } from "./battle";
import Basic from "./basic";
import { Enemy } from "./enemy";
import { Player } from "./player";

export interface ISkillEffect {
    damage?: number;
    damageAddition?: number;
    damageAddAttr?: string;
    damageType: string;
    buff?: string;
    target?: boolean; // 1 enemy, 0 player
}

export class Skill extends Basic {
    private _name: string;
    private _effects: ISkillEffect[];

    get name() {
      return this._name
    }
    
    set name(val: string) {
      this._name = val
    }
    
    get effects() {
      return this._effects
    }
    
    set effects(val: ISkillEffect[]) {
      this._effects = val
    }

    /**
     *
     */
    constructor(data) {
        super(data);
    }

    static buildSkillsById(skillIds: number[]) : Skill[] {
        let skills = skillsContent.filter(i => skillIds.indexOf(i.id) > -1);
        return skills.map( s => new Skill(s))
    }

    static getSkillById(skillId: number): Skill {
        let skill = skillsContent.filter(i => i.id == skillId)[0]
        skill = skill || skillsContent[0]
        return new Skill(skill)
    }

    static skillChoose(skills: Skill[], sourceO?: Player | Enemy) : Skill {
        const index = Math.floor(Math.random()*skills.length)
        return skills[index]
    }

    static calcDamages(skill: Skill, source: boolean, sourceO: Player | Enemy) : IAttackInfo[] {
        let attackInfos:IAttackInfo[] =[]
        skill.effects.forEach(e => {
            let attackInfo: IAttackInfo = {
                damage: 0,
                damageType: e.damageType,
                target: !source
            };
            if (e.damage) {
                attackInfo.damage += e.damage
            }
            if (e.damageAddition) {
                attackInfo.damage += e.damageAddition * (sourceO[e.damageAddAttr] || 0)
            }
            attackInfos.push(attackInfo)
        })
        return attackInfos
    }
}