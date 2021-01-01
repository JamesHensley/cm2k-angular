import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IBlock } from '../interfaces/IBlock';
import { IProcessor } from '../interfaces/IProcessor';
import { IBlockModel } from "../interfaces/IBlockModel";
import { ILink } from "../interfaces/ILink";

export class BlockModelOutput implements IBlockModel {
    id: string;
    label: string;
    edges: Array<IBlockEdge>;
    processor: IProcessor;

    constructor() {
        this.edges = [
            { name: 'InputEdge', direction: 'in', connections: [] } as IBlockEdge
        ]
    }

    GetNodeObj(): IBlock {
        throw new Error("Method not implemented.");
    }
    GetConnectionsObj(): ILink[] {
        throw new Error("Method not implemented.");
    }
    AddConnection(otherBlock: IBlock): void {
        throw new Error("Method not implemented.");
    }
}
