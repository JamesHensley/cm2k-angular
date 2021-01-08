import { Guid } from 'typescript-guid';

import { IBlockModelEdge } from "../interfaces/IBlock/IBlockModelEdge";
import { IBlockProcessor } from '../interfaces/IBlock/IBlockProcessor';
import { IBlockModel } from "../interfaces/IBlock/IBlockModel";
import { ILink } from "../interfaces/ILink";
import { INode } from "../interfaces/INode";
import { IConnection } from '../interfaces/IConnection';
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelField';
import { BlockTypes } from '../enums';
import { BlockModelField } from './BlockModelField';

export class BlockModelInput implements IBlockModel {
    guid: string;
    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }
    get blockType(): string { return 'BlockModelInput'; };
    get blockTypeFriendlyName(): string { return 'BlockModelInput'; };
    serviceType: BlockTypes.INPUTBLOCK;
    label: string;
    blockName: string;
    edgeOutput: IBlockModelEdge;
    processor: IBlockProcessor;
    modelFields: BlockModelField;
    
    constructor(blockName: string) {
        this.blockName = blockName;
        this.label = blockName;

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
            connectedBlockId: otherBlock.id
        } as IConnection)
    }

    ToJSON(): string { return JSON.stringify(this); }
}
