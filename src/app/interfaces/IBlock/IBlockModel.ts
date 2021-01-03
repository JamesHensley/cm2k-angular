// Interface for all blocks

import { IBlockModelEdge } from './IBlockModelEdge';
import { IBlockModelField } from './IBlockModelFields';
import { ILink } from '../ILink';
import { INode } from '../INode';
import { BlockTypes } from '../../enums';

export interface IBlockModel {
    blockType: string;
    blockTypeFriendlyName: string;
    serviceType: BlockTypes;
    id: string;
    guid: string;
    label: string;
    edgeInput?: IBlockModelEdge;
    edgeOutput?: IBlockModelEdge;
    modelFields: Array<IBlockModelField>;
    GetNodeObj(): INode;
    GetConnectionsObj(): Array<ILink>;
    AddConnection(otherBlock: IBlockModel): void;
    ToJSON(): string;
}
