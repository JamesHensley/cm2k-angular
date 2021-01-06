// Interface for all blocks

import { IBlockModelEdge } from './IBlockModelEdge';
import { IBlockModelField } from './IBlockModelField';
import { ILink } from '../ILink';
import { INode } from '../INode';
import { BlockTypes } from '../../enums';
import { BlockModelField } from 'src/app/models/BlockModelField';

export interface IBlockModel {
    blockType: string;
    blockTypeFriendlyName: string;
    serviceType: BlockTypes;
    id: string;
    guid: string;
    label: string;
    edgeInput?: IBlockModelEdge;
    edgeOutput?: IBlockModelEdge;
    modelFields: BlockModelField;
    GetNodeObj(): INode;
    GetConnectionsObj(): Array<ILink>;
    AddConnection(otherBlock: IBlockModel): void;
    ToJSON(): string;
}
