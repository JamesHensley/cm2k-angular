import { Guid } from 'typescript-guid';

import { IBlockModelEdge } from "../interfaces/IBlock/IBlockModelEdge";
import { IBlockProcessor } from '../interfaces/IBlock/IBlockProcessor';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { IConnection } from '../interfaces/IConnection';
import { INode } from '../interfaces/INode';
import { ILink } from "../interfaces/ILink";
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelField';
import { BlockTypes } from '../enums';
import { IConnector } from '../interfaces/IConnector';
import { BlockModelEdge } from './BlockModelEdge';
import { BlockModelField } from './BlockModelField';

export class BlockModelEndpoint implements IBlockModel {
    id: string;

    blockServiceId: string;
    blockServiceSubType: string;
    blockTemplateGuid: string;

    label: string;
    blockName: string;
    blockType = BlockTypes.PROCESSORBLOCK;

    edgeInput: IBlockModelEdge;
    edgeOutput: IBlockModelEdge;
    processor: IBlockProcessor;
    modelFields: IBlockModelField;
    allModelFields: Array<IBlockModelField>;

    constructor(blockName: string, blockServiceId: string, id?: string) {
        this.id = 'N-' + ( id ? id : Guid.create().toString().replace(/\-/ig, ''));
        
        this.blockServiceId = blockServiceId;
        this.blockName = blockName;
        this.label = blockName;

        this.edgeInput = new BlockModelEdge('InputEdge', 'in', null);
        this.edgeOutput = new BlockModelEdge('OutputEdge', 'out', null);

        this.modelFields = new BlockModelField(blockName, 'object', [Guid.create().toString()], []);
    }

    GetNodeObj(): INode {
        return {
            id: this.id,
            label: this.label || '',
            edges: []
        } as INode
    }
}
