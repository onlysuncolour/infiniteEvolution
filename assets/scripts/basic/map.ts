import Basic from "./basic";
import { World } from "./world";

export interface IMapNode {
    type: string
}

export class Map extends Basic {
    public world: World;
    
    public name: string;
    public mapNodes: IMapNode[];

    
}