// Interface for all blocks

import { IBlock } from './IBlock';
import { IBlockEdge } from './IBlockEdge';
import { ILink } from './ILink';

export interface IBlockModel {
    id: string;
    label: string;
    edges?: Array<IBlockEdge>;
    GetNodeObj(): IBlock;
    GetConnectionsObj(): Array<ILink>;
    AddConnection(otherBlock: IBlock): void;
}
