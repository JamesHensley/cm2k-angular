// Interface for all blocks

import { IBlockModelEdge } from './IBlockModelEdge';
import { IBlockModelField } from './IBlockModelField';
import { ILink } from '../ILink';
import { INode } from '../INode';
import { BlockTypes } from '../../enums';
import { BlockModelField } from 'src/app/models/BlockModelField';
import { IBlockSettings } from 'src/app/services/appConfigService';

export interface IBlockModel {
    blockServiceId: string;
    blockServiceSubType: string;
    blockTemplateGuid: string;

    id: string;
    blockName: string;
    blockType: BlockTypes;
    label: string;
    edgeInput?: IBlockModelEdge;
    edgeOutput?: IBlockModelEdge;
    modelFields: IBlockModelField;
    blockSettings: IBlockSettings;
}
