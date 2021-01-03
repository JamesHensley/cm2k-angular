// Interface for all blocks

import { IBlockEdge } from './IBlockEdge';
import { ILink } from './ILink';
import { INode } from './INode';

export interface IBlockModel {
    blockType: string;
    id: string;
    label: string;
    edges: Map<string, IBlockEdge>;
    GetNodeObj(): INode;
    GetConnectionsObj(): Array<ILink>;
    AddConnection(otherBlock: IBlockModel): void;
}
