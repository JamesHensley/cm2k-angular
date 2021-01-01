import { Guid } from 'typescript-guid';

import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IBlock } from '../interfaces/IBlock';
import { IProcessor } from '../interfaces/IProcessor';
import { ILink } from "../interfaces/ILink";
import { IBlockModel } from '../interfaces/IBlockModel';
import { IConnection } from '../interfaces/IConnection';

export class BlockModelEndpoint implements IBlockModel {
    public guid: string;
    public label: string;
    public edges: Array<IBlockEdge>;
    public processor: IProcessor;
    public blockName: string;
    public url: string;
    public timeOut: number;
    public edgeInput = { name: 'InputEdge', direction: 'in', connections: [] } as IBlockEdge;
    public edgeOutput = { name: 'OutputEdge', direction: 'out', connections: [] } as IBlockEdge;

    constructor() {
        this.edges = [ this.edgeInput, this.edgeOutput ]
    }

    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }

    GetNodeObj(): IBlock {
        return {
            id: this.id,
            label: this.label || '',
            edges: []
        } as IBlock
    }

    GetConnectionsObj(): Array<ILink> {
        if(this.edgeOutput && this.edgeOutput.connections) {
            return this.edgeOutput.connections.map(m => {
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

    AddConnection(otherBlock: IBlock): void {
        this.edgeOutput.connections.push({
            connectedBlockId: otherBlock.id
        } as IConnection)
    }
}
