import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IProcessor } from '../interfaces/IProcessor';
import { IBlockModel } from "../interfaces/IBlockModel";
import { ILink } from "../interfaces/ILink";
import { INode } from "../interfaces/INode";

export class BlockModelOutput implements IBlockModel {
    id: string;
    get blockType(): string { return 'BlockModelOutput'; };
    label: string;
    edges: Map<string, IBlockEdge>;
    processor: IProcessor;

    constructor() {
        this.edges = new Map<string, IBlockEdge>();
        this.edges.set('in', { name: 'InputEdge', direction: 'in', connections: [] } as IBlockEdge);
    }

    GetNodeObj(): INode {
        throw new Error("Method not implemented.");
    }
    GetConnectionsObj(): ILink[] {
        throw new Error("Method not implemented.");
    }
    AddConnection(otherBlock: IBlockModel): void {
        throw new Error("Method not implemented.");
    }
}
