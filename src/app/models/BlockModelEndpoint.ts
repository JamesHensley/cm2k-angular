import { Guid } from 'typescript-guid';

import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IProcessor } from '../interfaces/IProcessor';
import { IBlockModel } from '../interfaces/IBlockModel';
import { IConnection } from '../interfaces/IConnection';
import { INode } from '../interfaces/INode';
import { ILink } from "../interfaces/ILink";

export class BlockModelEndpoint implements IBlockModel {
    guid: string;
    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }
    get blockType(): string { return 'BlockModelEndpoint'; };
    get blockTypeFriendlyName(): string { return 'BlockModelEndpoint'; };
    label: string;
    edges: Map<string, IBlockEdge>;
    processor: IProcessor;
    blockName: string;
    url: string;
    timeOut: number;

    constructor() {
        this.edges = new Map<string, IBlockEdge>();

        this.edges.set('out', { name: 'OutputEdge', direction: 'out', connections: [] } as IBlockEdge);
        this.edges.set('in', { name: 'InputEdge', direction: 'in', connections: [] } as IBlockEdge);
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
