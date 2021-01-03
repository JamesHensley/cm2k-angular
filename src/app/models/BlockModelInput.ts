import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IProcessor } from '../interfaces/IProcessor';
import { IBlockModel } from "../interfaces/IBlockModel";
import { ILink } from "../interfaces/ILink";
import { INode } from "../interfaces/INode";

export class BlockModelInput implements IBlockModel {
    id: string;
    label: string;
    edges: Map<string, IBlockEdge>;
    processor: IProcessor;
    get blockType(): string { return 'BlockModelInput'; };

    constructor() {
        this.edges = new Map<string, IBlockEdge>();
        this.edges.set('out', { name: 'OutputEdge', direction: 'out', connections: [] } as IBlockEdge);
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
