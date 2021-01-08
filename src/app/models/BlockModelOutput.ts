import { Guid } from 'typescript-guid';

import { IBlockModelEdge } from "../interfaces/IBlock/IBlockModelEdge";
import { IBlockProcessor } from '../interfaces/IBlock/IBlockProcessor';
import { IBlockModel } from "../interfaces/IBlock/IBlockModel";
import { ILink } from "../interfaces/ILink";
import { INode } from "../interfaces/INode";
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelField';
import { BlockTypes } from '../enums';
import { BlockModelField } from './BlockModelField';

export class BlockModelOutput implements IBlockModel {
    guid: string;
    get id(): string { return 'N-' + this.guid.replace(/\-/ig, ''); }
    get blockType(): string { return 'BlockModelOutput'; };
    get blockTypeFriendlyName(): string { return 'BlockModelOutput'; };
    serviceType: BlockTypes.OUTPUTBLOCK;
    label: string;
    blockName: string;
    edgeInput: IBlockModelEdge;
    processor: IBlockProcessor;
    modelFields: BlockModelField;
    
    constructor(blockName: string) {
        this.blockName = blockName;
        this.label = blockName;

        this.edgeInput = { name: 'InputEdge', direction: 'in', connections: [] } as IBlockModelEdge;
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

    ToJSON(): string { return JSON.stringify(this); }
}
