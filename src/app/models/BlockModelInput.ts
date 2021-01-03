import { Guid } from 'typescript-guid';

import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IProcessor } from '../interfaces/IProcessor';
import { IBlockModel } from "../interfaces/IBlockModel";
import { ILink } from "../interfaces/ILink";
import { INode } from "../interfaces/INode";
import { IConnection } from '../interfaces/IConnection';

export class BlockModelInput implements IBlockModel {
    guid: string;
    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }
    get blockType(): string { return 'BlockModelInput'; };
    get blockTypeFriendlyName(): string { return 'BlockModelInput'; };
    label: string;
    edges: Map<string, IBlockEdge>;
    processor: IProcessor;

    constructor() {
        this.edges = new Map<string, IBlockEdge>();
        this.edges.set('out', { name: 'OutputEdge', direction: 'out', connections: [] } as IBlockEdge);
    }

    GetNodeObj(): INode {
        return {
            id: this.id,
            label: this.label || '',
            edges: []
        } as INode
    }

    GetConnectionsObj(): Array<ILink> {
        if(this.edges.has('out') && this.edges.get('out').connections) {
            return this.edges.get('out').connections.map(m => {
                return {
                    id: 'L-' + Guid.create().toString().replace(/\-/ig, ''),
                    source: this.id,
                    target: m.connectedBlockId,
                    label: this.id.substring(0, 5)
                } as ILink
            });
        }
        return [];
    }

    AddConnection(otherBlock: IBlockModel): void {
        this.edges.get('out').connections.push({
            connectedBlockId: otherBlock.id
        } as IConnection)
    }
}
