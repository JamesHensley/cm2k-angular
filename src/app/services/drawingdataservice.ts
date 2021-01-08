
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
import { AppConfigService } from './appConfigService';
import { BlockModelField } from '../models/BlockModelField';

export interface DrawingUpdatedData {
    newDiagramData: IDrawing;
    newBlockData: Array<IBlockModel>;
    appMode: string;
    editable: boolean;
    drawingLayout: string;
}

@Injectable({ providedIn: 'root' })
export class DrawingDataService {
    constructor(
        private appConfigService: AppConfigService
    ) {
        this.drawingLayout = 'dagre';
        this.editable = false;
        this.appMode = 'View'
    }

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

    xxxconstructor() {
        this.drawingLayout = 'dagre';
        this.editable = false;
        this.appMode = 'View'

        /*
        this._blocks[0].AddConnection(this._blocks[1]);
        this._blocks[1].AddConnection(this._blocks[2]);
        this._blocks[1].AddConnection(this._blocks[4]);
        this._blocks[2].AddConnection(this._blocks[3]);
        this._blocks[2].AddConnection(this._blocks[4]);
        this._blocks[3].AddConnection(this._blocks[4]);
        this._blocks[3].AddConnection(this._blocks[1]);
        */
    }

    block(blockId: string): IBlockModel {
        return this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t });
    }

    private cloneBlockByTemplate(serviceId: string, blockGuid: string, blockName: string): IBlockModel {
        let newBlock: IBlockModel;
        const block: IBlockModel = this.appConfigService.getBlockTemplateByGuid(blockGuid);

        let blockServiceType = this.appConfigService.getBlockServiceTypeFromServiceId(serviceId);
        if(blockServiceType == BlockTypes.INPUTBLOCK) { newBlock = new BlockModelInput(blockName, serviceId); }
        if(blockServiceType == BlockTypes.PROCESSORBLOCK) { newBlock = new BlockModelEndpoint(blockName, serviceId); }
        if(blockServiceType == BlockTypes.OUTPUTBLOCK) { newBlock = new BlockModelOutput(blockName, serviceId); }

        if(newBlock) {
            newBlock.guid = Guid.create().toString();
            newBlock.modelFields.children = JSON.parse(JSON.stringify(block.modelFields.children));
            return newBlock;
        }
        return null;
    }

    addBlockByTemplate(serviceId: string, blockGuid: string, blockName: string) {
        let block: IBlockModel = this.cloneBlockByTemplate(serviceId, blockGuid, blockName);
        console.log(block);
        this._blocks.push(block);
        this.emitUpdate(this.drawingData, this._blocks);
    }

    addNewBlock(blockType: string, blockName: string): void {
        let block: IBlockModel;
        let blockServiceId = this.appConfigService.getBlockServiceIdFromServiceType(blockType);

        if(blockType == BlockTypes.INPUTBLOCK) { block = new BlockModelInput(blockName, blockServiceId); }
        if(blockType == BlockTypes.PROCESSORBLOCK) { block = new BlockModelEndpoint(blockName, blockServiceId); }
        if(blockType == BlockTypes.OUTPUTBLOCK) { block = new BlockModelOutput(blockName, blockServiceId); }

        if(block && blockServiceId) {
            block.guid = Guid.create().toString();
            this._blocks.push(block);
    
            this.emitUpdate(this.drawingData, this._blocks);
        }
        else {
            console.log(blockName, blockType, block, blockServiceId);
            throw new Error("DrawingDataService->addNewBlock: Could not locate a suitable block type or create a new block");
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

    exportDrawing(): void {
        console.log("*  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *");
        console.log(JSON.stringify(this._blocks, null, '    '));
        console.log("*  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *");
    }

    saveNodeChanges(): void {

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
        this.drawingUpdated.emit({
            newDiagramData: diagramData || this.drawingData,
            newBlockData: blockData || this._blocks,
            appMode: this.appMode,
            editable: this.editable,
            drawingLayout: this.drawingLayout
        });
    }
}
