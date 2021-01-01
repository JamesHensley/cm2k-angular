// Interface for all blocks

import { IBlockEdge } from './IBlockEdge';

export interface IBlock {
    id: string;
    label: string;
    edges?: Array<IBlockEdge>;
}
