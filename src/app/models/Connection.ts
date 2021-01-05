import { IConnection } from "../interfaces/IConnection";
import { IConnector } from "../interfaces/IConnector";
import { Connector } from "./Connector";

export class Connection implements IConnection {
    connectedBlockId: string;
    connectors: IConnector[];
    
    constructor(connectedBlockId: string, connectors: IConnector[]) {
        this.connectedBlockId = connectedBlockId;
        this.connectors = connectors ? connectors : new Array<Connector>();
    }
}