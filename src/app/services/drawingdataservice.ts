
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Guid } from 'typescript-guid';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { IDrawing } from '../interfaces/IDrawing';
import { ILink } from '../interfaces/ILink';
import { INode } from '../interfaces/INode';
import { BlockModelEndpoint } from '../models/BlockModelEndpoint';
import { BlockModelInput } from '../models/BlockModelInput';
import { BlockModelOutput } from '../models/BlockModelOutput';

import { BlockTypes } from '../enums';
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelField';

@Injectable({ providedIn: 'root' })
export class DrawingDataService {
    drawingUpdated = new EventEmitter();

    private _blocks: Array<IBlockModel> = [];

    get drawingData(): IDrawing {
        return {
            nodes: this._blocks.reduce((t: Array<INode>, n: IBlockModel) => {
                return [].concat.apply(t, [n.GetNodeObj()]);
            }, []),
            links: this._blocks.reduce((t: Array<ILink>, n: IBlockModel) => {
                return [].concat.apply(t, n.GetConnectionsObj());
            }, []),
            editable: false
        } as IDrawing;
    }

    constructor() {
        let iBlock = new BlockModelInput();
        iBlock.guid = Guid.create().toString();

        this._blocks.push(iBlock)

        for(var i = 1; i < 4; i++) {
            const block = new BlockModelEndpoint();
            block
            block.guid = Guid.create().toString();
            this._blocks.push(block);
        }
        let oBlock = new BlockModelOutput();
        oBlock.guid = Guid.create().toString();
        this._blocks.push(oBlock)

        this._blocks[0].AddConnection(this._blocks[1]);
        this._blocks[1].AddConnection(this._blocks[2]);
        this._blocks[1].AddConnection(this._blocks[4]);
        this._blocks[2].AddConnection(this._blocks[3]);
        this._blocks[2].AddConnection(this._blocks[4]);
        this._blocks[3].AddConnection(this._blocks[4]);
        this._blocks[3].AddConnection(this._blocks[1]);
        this._blocks[0].label = 'inputCSV';
        this._blocks[1].label = 'Q';
        this._blocks[2].label = 'RS';
        this._blocks[3].label = 'D';
        this._blocks[4].label = 'outputCSV';
    }

    block(blockId: string): IBlockModel {
        return this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t });
    }



    addNode(nodeType: string): void {
        let block: IBlockModel;
        if(nodeType == BlockTypes.INPUTBLOCK) { block = new BlockModelInput(); }
        if(nodeType == BlockTypes.ENDPOINTBLOCK) { block = new BlockModelEndpoint(); }
        if(nodeType == BlockTypes.OUTPUTBLOCK) { block = new BlockModelOutput(); }
        if(block) {
            block.guid = Guid.create().toString();
            this._blocks.push(block);
    
            this.drawingUpdated.emit(this.drawingData);
        }
    }

    addFieldToNode(nodeId: string, path: Array<string>, field: IBlockModelField): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        console.log('DrawingDataService->addFieldToNode: ', thisBlock, path, field);
    }

    removeFieldFromNode(nodeId: string, path: Array<string>, field: IBlockModelField): void {
        
    }


}
