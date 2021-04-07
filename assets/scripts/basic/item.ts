import Basic from "./basic"

export default class item extends Basic {
    id: number;
    name: string;
    description: string;

    maxStack: number;

    usage: string
}