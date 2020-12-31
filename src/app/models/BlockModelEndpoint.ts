import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IBlock } from '../interfaces/IBlock';
import { IProcessor } from '../interfaces/IProcessor';

export class BlockModelEndpoint implements IBlock {
    public edges: Array<IBlockEdge>;
    public processor: IProcessor;

    private _url: string;
    set url(val: string) { this._url = val; }
    get url(): string { return this._url; }


    
    constructor() {
        this.edges = [
            { name: 'InputEdge', direction: 'in', connections: [] } as IBlockEdge,
            { name: 'OutputEdge', direction: 'out', connections: [] } as IBlockEdge
        ]
    }
}
