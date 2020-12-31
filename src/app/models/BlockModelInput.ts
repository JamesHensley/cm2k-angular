import { IBlockEdge } from "../interfaces/IBlockEdge";
import { IBlock } from '../interfaces/IBlock';
import { IProcessor } from '../interfaces/IProcessor';

export class BlockModelInput implements IBlock {
    public edges: Array<IBlockEdge>;
    public processor: IProcessor;

    constructor() {
        this.edges = [
            { name: 'OutputEdge', direction: 'out', connections: [] } as IBlockEdge
        ]
    }
}
