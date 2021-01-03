// The link/relationship between two connectors
import { IConnector } from "./IConnector";

export interface IConnection {
    connectedBlockId: string;
    connectors: Array<IConnector>;
}