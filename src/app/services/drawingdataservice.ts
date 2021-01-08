
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
            const block = new BlockModelEndpoint('');
            
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
//this._blocks[2].modelFields.children.push({ name: 'web', type: 'string', path: ['RS', 'web'], children: [] } as IBlockModelField);
        this._blocks[3].label = 'D';
        this._blocks[4].label = 'outputCSV';
    }

    block(blockId: string): IBlockModel {
        return this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t });
    }



    addNewBlock(blockType: string, blockName: string): void {
        let block: IBlockModel;
        if(blockType == BlockTypes.INPUTBLOCK) { block = new BlockModelInput(); }
        if(blockType == BlockTypes.ENDPOINTBLOCK) { block = new BlockModelEndpoint(blockName); }
        if(blockType == BlockTypes.OUTPUTBLOCK) { block = new BlockModelOutput(); }
        if(block) {
            block.guid = Guid.create().toString();
            this._blocks.push(block);
    
            this.drawingUpdated.emit({ newDiagramData: this.drawingData, newBlockData: this._blocks });
        }
    }

    addFieldToNode(nodeId: string, path: Array<string>, newField: IBlockModelField): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        let parent = this.getTreeItem(thisBlock, path);
        parent.children.push(newField);
        newField.path = [].concat.apply(parent.path, [newField.id]);

        this.drawingUpdated.emit({ newDiagramData: this.drawingData, newBlockData: this._blocks });
    }

    renameField(nodeId: string, path: Array<string>, newName: string): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        let field = this.getTreeItem(thisBlock, path);
        field.name = newName;

        this.drawingUpdated.emit({ newDiagramData: this.drawingData, newBlockData: this._blocks });
    }

    removeFieldFromNode(nodeId: string, path: Array<string>): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        let parentPath = [].concat.apply(path);
        let removalField = parentPath.pop();
        let parentNode = this.getTreeItem(thisBlock, parentPath);
        parentNode.children = parentNode.children.filter(f => f.id != removalField);
        this.drawingUpdated.emit({ newDiagramData: this.drawingData, newBlockData: this._blocks });
    }

    private getTreeItem(block: IBlockModel, path: Array<string>): IBlockModelField {
        let root: IBlockModelField = block.modelFields;
    
        path.forEach((d, i) => {
            if(i==0) { return root; }
            root = root.children.reduce((t,n) => { return n.id == d ? n : t; }, {} as IBlockModelField)
        })
        return root;
    }

}
