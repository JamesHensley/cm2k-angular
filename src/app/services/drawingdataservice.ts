
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

export interface DrawingUpdatedData {
    newDiagramData: IDrawing;
    newBlockData: Array<IBlockModel>;
    appMode: string;
    editable: boolean;
    drawingLayout: string;
}

@Injectable({ providedIn: 'root' })
export class DrawingDataService {
    drawingUpdated = new EventEmitter<DrawingUpdatedData>();

    private _blocks: Array<IBlockModel> = [];

    private _editable: boolean;
    get editable(): boolean { return this._editable; }
    set editable(val: boolean) {
        this._editable = val;
        this._appMode = val ? 'Edit' : 'View'
        this.emitUpdate();
    }

    private _appMode: string;
    get appMode(): string { return this._appMode; }
    set appMode(val: string) {
        this._appMode = val;
        this._editable = val == 'Edit';
        this.emitUpdate();
    }

    private _drawingLayout: string;
    get drawingLayout(): string { return this._drawingLayout; }
    set drawingLayout(val: string) { this._drawingLayout = val; this.emitUpdate(); }

    get drawingData(): IDrawing {
        return {
            nodes: this._blocks.reduce((t: Array<INode>, n: IBlockModel) => {
                return [].concat.apply(t, [n.GetNodeObj()]);
            }, []),
            links: this._blocks.reduce((t: Array<ILink>, n: IBlockModel) => {
                return [].concat.apply(t, n.GetConnectionsObj());
            }, [])
        } as IDrawing;
    }

    constructor() {
        this.drawingLayout = 'dagre';
        this.editable = false;
        this.appMode = 'View'

        const labels = ['inputCSV', 'Q', 'RS', 'D', 'outputCSV'];

        let iBlock = new BlockModelInput(labels[0]);
        iBlock.guid = Guid.create().toString();
        this._blocks.push(iBlock)

        for(var i = 1; i < 4; i++) {
            const block = new BlockModelEndpoint(labels[i]);
            
            block.guid = Guid.create().toString();
            this._blocks.push(block);
        }

        let oBlock = new BlockModelOutput(labels[4]);
        oBlock.guid = Guid.create().toString();
        this._blocks.push(oBlock)

        this._blocks[0].AddConnection(this._blocks[1]);
        this._blocks[1].AddConnection(this._blocks[2]);
        this._blocks[1].AddConnection(this._blocks[4]);
        this._blocks[2].AddConnection(this._blocks[3]);
        this._blocks[2].AddConnection(this._blocks[4]);
        this._blocks[3].AddConnection(this._blocks[4]);
        this._blocks[3].AddConnection(this._blocks[1]);
    }

    block(blockId: string): IBlockModel {
        return this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t });
    }



    addNewBlock(blockType: string, blockName: string): void {
        let block: IBlockModel;
        if(blockType == BlockTypes.INPUTBLOCK) { block = new BlockModelInput(blockName); }
        if(blockType == BlockTypes.ENDPOINTBLOCK) { block = new BlockModelEndpoint(blockName); }
        if(blockType == BlockTypes.OUTPUTBLOCK) { block = new BlockModelOutput(blockName); }
        if(block) {
            block.guid = Guid.create().toString();
            this._blocks.push(block);
    
            this.emitUpdate(this.drawingData, this._blocks);
        }
    }

    renameBlock(blockId: string, newName: string): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t;});
        thisBlock.label = newName;
        thisBlock.blockName = newName;
        thisBlock.modelFields.name = newName;

        this.emitUpdate(this.drawingData, this._blocks);
    }

    addFieldToNode(nodeId: string, path: Array<string>, newField: IBlockModelField): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        let parent = this.getTreeItem(thisBlock, path);
        parent.children.push(newField);
        newField.path = [].concat.apply(parent.path, [newField.id]);

        this.emitUpdate(this.drawingData, this._blocks);
    }

    renameField(nodeId: string, path: Array<string>, newName: string): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        let field = this.getTreeItem(thisBlock, path);
        field.name = newName;

        this.emitUpdate(this.drawingData, this._blocks);
    }

    removeFieldFromNode(blockId: string, path: Array<string>): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t;});
        let parentPath = [].concat.apply(path);
        let removalField = parentPath.pop();
        let parentNode = this.getTreeItem(thisBlock, parentPath);
        parentNode.children = parentNode.children.filter(f => f.id != removalField);
        this.emitUpdate(this.drawingData, this._blocks);
    }

    private getTreeItem(block: IBlockModel, path: Array<string>): IBlockModelField {
        let root: IBlockModelField = block.modelFields;
    
        path.forEach((d, i) => {
            if(i==0) { return root; }
            root = root.children.reduce((t,n) => { return n.id == d ? n : t; }, {} as IBlockModelField)
        })
        return root;
    }

    private emitUpdate(diagramData?: IDrawing, blockData?: Array<IBlockModel>): void {
        console.log('DrawingDataService->emitUpdate: ', this)
        this.drawingUpdated.emit({
            newDiagramData: diagramData || this.drawingData,
            newBlockData: blockData || this._blocks,
            appMode: this.appMode,
            editable: this.editable,
            drawingLayout: this.drawingLayout
        });
    }
}
