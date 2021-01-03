// Interface for all blocks

import { IBlockModelEdge } from './IBlockModelEdge';
import { IBlockModelField } from './IBlockModelFields';
import { ILink } from '../ILink';
import { INode } from '../INode';

export interface IBlockModel {
    blockType: string;
    blockTypeFriendlyName: string;
    id: string;
    guid: string;
    label: string;
    edges: Map<string, IBlockModelEdge>;
    modelFields: Array<IBlockModelField>;
    GetNodeObj(): INode;
    GetConnectionsObj(): Array<ILink>;
    AddConnection(otherBlock: IBlockModel): void;
}
