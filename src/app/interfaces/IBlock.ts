// Interface for all blocks

import { IBlockEdge } from './IBlockEdge';
export interface IBlock {
    edges: Array<IBlockEdge>;
}
