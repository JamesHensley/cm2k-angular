import { IBlockModelEdge } from "../interfaces/IBlock/IBlockModelEdge";
import { IConnection } from "../interfaces/IConnection";
import { Connection } from "./Connection";

export class BlockModelEdge implements IBlockModelEdge {
    name: string;
    connections: IConnection[];
    direction: string;

    constructor(name: string, direction: string, connections?: Array<IConnection>) {
        this.name = name;
        this.direction = direction;
        this.connections = connections ? connections : new Array<Connection>();
    }
}