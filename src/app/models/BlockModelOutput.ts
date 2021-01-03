import { Guid } from 'typescript-guid';

import { IBlockModelEdge } from "../interfaces/IBlock/IBlockModelEdge";
import { IBlockProcessor } from '../interfaces/IBlock/IBlockProcessor';
import { IBlockModel } from "../interfaces/IBlock/IBlockModel";
import { ILink } from "../interfaces/ILink";
import { INode } from "../interfaces/INode";
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelFields';

export class BlockModelOutput implements IBlockModel {
    guid: string;
    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }
    get blockType(): string { return 'BlockModelOutput'; };
    get blockTypeFriendlyName(): string { return 'BlockModelOutput'; };
    label: string;
    edges: Map<string, IBlockModelEdge>;
    processor: IBlockProcessor;
    modelFields: IBlockModelField[];
    
    constructor() {
        this.edges = new Map<string, IBlockModelEdge>();
        this.edges.set('in', { name: 'InputEdge', direction: 'in', connections: [] } as IBlockModelEdge);
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
