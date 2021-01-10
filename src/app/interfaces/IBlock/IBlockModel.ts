// Interface for all blocks

import { IBlockModelEdge } from './IBlockModelEdge';
import { IBlockModelField } from './IBlockModelField';
import { ILink } from '../ILink';
import { INode } from '../INode';
import { BlockTypes } from '../../enums';
import { BlockModelField } from 'src/app/models/BlockModelField';

export interface IBlockModel {
    blockServiceId: string;
    blockServiceType: BlockTypes;
    blockServiceSubType: string;

    id: string;
    guid: string;
    blockName: string;
    label: string;
    edgeInput?: IBlockModelEdge;
    edgeOutput?: IBlockModelEdge;
    modelFields: BlockModelField;
    GetNodeObj(): INode;
    //GetConnectionsObj(): Array<ILink>;
    //AddConnection(otherBlock: IBlockModel): void;
    ToJSON(): string;
}
