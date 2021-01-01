// Defines an edge on a block (input or output)

import { IConnection } from './IConnection';
import { IConnector } from './IConnector';
export interface IBlockEdge {
    name: string;
    connections: Array<IConnection>;
    direction: string;
}