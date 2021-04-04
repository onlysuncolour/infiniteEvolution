import Basic from "./basic";
import { WorldEvent } from "./worldEvent";
import { Facility } from "./facility";
import { Map } from "./map";
import { Shop } from "./shop";
import { NPC } from "./npc"
import { Enemy } from "./enemy";

export class World extends Basic {
    public maps: Map[];
    public shop: Shop;
    public facilities: Facility[];
    public worldEvents: WorldEvent[];
    public npcs: NPC[];
    public enemies: Enemy[];

    
}