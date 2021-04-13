import Basic from "./basic"

export default class Item extends Basic {
    id: number;
    name: string;
    description: string;

    maxStack: number;

    usage: string;

    texture: string;
}