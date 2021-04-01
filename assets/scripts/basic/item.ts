import Basic from "./basic"

export default class item extends Basic{
    id: number;
    name: string;
    description: string;

    level: string;

    maxStack: number;

    usage: string
}