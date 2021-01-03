import { Guid } from 'typescript-guid';

import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IProcessor } from '../interfaces/IProcessor';
import { IBlockModel } from "../interfaces/IBlockModel";
import { ILink } from "../interfaces/ILink";
import { INode } from "../interfaces/INode";

export class BlockModelOutput implements IBlockModel {
    guid: string;
    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }
    get blockType(): string { return 'BlockModelOutput'; };
    get blockTypeFriendlyName(): string { return 'BlockModelOutput'; };
    label: string;
    edges: Map<string, IBlockEdge>;
    processor: IProcessor;

    constructor() {
        this.edges = new Map<string, IBlockEdge>();
        this.edges.set('in', { name: 'InputEdge', direction: 'in', connections: [] } as IBlockEdge);
    }

    GetNodeObj(): INode {
        return {
            id: this.id,
            label: this.label || '',
            edges: []
        } as INode
    }

    GetConnectionsObj(): ILink[] {
        return [];
    }
    AddConnection(otherBlock: IBlockModel): void {
        throw new Error("Method not implemented.");
    }
}
