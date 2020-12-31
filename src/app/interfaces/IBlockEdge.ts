// Defines an edge on a block (input or output)

import { IConnector } from './IConnector';
export interface IBlockEdge {
    name: string;
    connections: Array<IConnector>;
    direction: string;
}