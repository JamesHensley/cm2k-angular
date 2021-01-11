import { Guid } from 'typescript-guid';

import { IBlockModelEdge } from "../interfaces/IBlock/IBlockModelEdge";
import { IBlockProcessor } from '../interfaces/IBlock/IBlockProcessor';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelField';

import { BlockTypes } from '../enums';
import { BlockModelEdge } from './BlockModelEdge';
import { BlockModelField } from './BlockModelField';
import { IBlockSettings } from '../services/appConfigService';

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
    blockSettings: IBlockSettings;

    constructor(blockName: string, blockServiceId: string, id?: string) {
        this.id = 'N-' + ( id ? id : Guid.create().toString().replace(/\-/ig, ''));
        
        this.blockServiceId = blockServiceId;
        this.blockName = blockName;
        this.label = blockName;

        this.edgeInput = new BlockModelEdge('InputEdge', 'in', null);
        this.edgeOutput = new BlockModelEdge('OutputEdge', 'out', null);

        this.modelFields = new BlockModelField(blockName, 'object', [Guid.create().toString()], []);
    }
}
