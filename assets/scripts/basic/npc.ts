import Basic from "./basic";

export class NPC extends Basic {

    public name: String;

    public level: String;

    public attributes: NPCAttributes;

    public events: Array<NPCEvent>;

    public skills: Array<NPCSkill>;

    public items: Array<NPCItem>;

    constructor(data) {
        super(data)
    }

    loadData() {
        
    }
}

interface NPCAttributes {
    
}

interface NPCEvent {

}

interface NPCSkill {

}

interface NPCItem {

}


/*

*/