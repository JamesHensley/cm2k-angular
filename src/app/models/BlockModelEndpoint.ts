import { Guid } from 'typescript-guid';

import { IBlockModelEdge } from "../interfaces/IBlock/IBlockModelEdge";
import { IBlockProcessor } from '../interfaces/IBlock/IBlockProcessor';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { IConnection } from '../interfaces/IConnection';
import { INode } from '../interfaces/INode';
import { ILink } from "../interfaces/ILink";
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelFields';
import { BlockTypes } from '../enums';
import { IConnector } from '../interfaces/IConnector';

export class BlockModelEndpoint implements IBlockModel {
    guid: string;
    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }
    get blockType(): string { return 'BlockModelEndpoint'; };
    get blockTypeFriendlyName(): string { return 'BlockModelEndpoint'; };
    serviceType: BlockTypes.ENDPOINTBLOCK;
    label: string;
    //edges: Map<string, IBlockModelEdge>;
    edgeInput: IBlockModelEdge;
    edgeOutput: IBlockModelEdge;
    processor: IBlockProcessor;
    blockName: string;
    url: string;
    timeOut: number;
    modelFields: IBlockModelField[];

    constructor() {
        this.edgeInput = { name: 'InputEdge', direction: 'in', connections: [] } as IBlockModelEdge;
        this.edgeOutput = { name: 'OutputEdge', direction: 'out', connections: [] } as IBlockModelEdge;
    }

    GetNodeObj(): INode {
        return {
            id: this.id,
            label: this.label || '',
            edges: []
        } as INode
    }

    GetConnectionsObj(): Array<ILink> {
        return this.edgeOutput.connections.map(m => {
            return {
                id: 'L-' + Guid.create().toString().replace(/\-/ig, ''),
                source: this.id,
                target: m.connectedBlockId,
                label: this.id.substring(0, 5)
            } as ILink
        });
    }

    AddConnection(otherBlock: IBlockModel): void {
        this.edgeOutput.connections.push({
            connectedBlockId: otherBlock.id,
            connectors: new Array<IConnector>()
        } as IConnection)
    }

    ToJSON(): string { return JSON.stringify(this); }
}
