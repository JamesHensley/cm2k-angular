import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IBlock } from '../interfaces/IBlock';
import { IProcessor } from '../interfaces/IProcessor';

export class BlockModelOutput implements IBlock {
    public edges: Array<IBlockEdge>;
    public processor: IProcessor;

    constructor() {
        this.edges = [
            { name: 'InputEdge', direction: 'in', connections: [] } as IBlockEdge
        ]
    }
}
