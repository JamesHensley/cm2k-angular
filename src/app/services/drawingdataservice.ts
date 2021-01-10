
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
import { Link } from '../models/Link';
import { IBlockLinks } from '../interfaces/IBlock/IBlockLinks';

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

    private _links: Array<ILink> = [];
    get links(): Array<ILink> { return this._links; }

    private _blocks: Array<IBlockModel> = [];
    get blocks(): Array<IBlockModel> { return this._blocks; }
    
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
            links: this._links
        } as IDrawing;
    }

    xxxconstructor() {
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

    //Used to get a block from the drawing by it's id
    getBlockById(blockId: string): IBlockModel {
        return this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t });
    }

    addConnection(srcBlockId: string, destBlockId: string, linkName: string): void {
        const lnk = new Link();
        lnk.source = srcBlockId;
        lnk.target = destBlockId;
        lnk.label = linkName;
        this._links.push(lnk);

        //this.getBlockById(srcBlockId).AddConnection(this.getBlockById(destBlockId));
        this.emitUpdate();
    }

    removeConnection(linkId: string): void {
        this._links = this._links.filter(f => f.id != linkId);
        this.emitUpdate();
    }

    getLinkById(linkId: string): ILink {
        return this._links.reduce((t: ILink, n: ILink) => {
            return n.id == linkId ? n : t;
        }, null)
    }

    getLinksForBlock(blockId: string): IBlockLinks {
        return {
            "in": this._links.filter(f => f.target == blockId),
            "out": this._links.filter(f => f.source == blockId)
        } as IBlockLinks
    }

    //Used to add a copy of a galery block to the drawing
    addBlockToDrawing(serviceId: string, blockGuid: string, blockName: string) {
        let block: IBlockModel = this.cloneBlockByTemplate(serviceId, blockGuid, blockName);
        this._blocks.push(block);
        this.emitUpdate(this.drawingData, this._blocks);
    }

    //Used to add a new block type to the gallery
    addBlockToGallery(blockType: string, blockName: string): void {
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

    //Used to rename a block
    renameBlock(blockId: string, newName: string): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == blockId) ? n : t;});
        thisBlock.label = newName;
        thisBlock.blockName = newName;
        thisBlock.modelFields.name = newName;

        this.emitUpdate(this.drawingData, this._blocks);
    }

    //Used to add a field to a given node
    addFieldToNode(nodeId: string, path: Array<string>, newField: IBlockModelField): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        let parent = this.getTreeItem(thisBlock, path);
        parent.children.push(newField);
        newField.path = [].concat.apply(parent.path, [newField.id]);

        this.emitUpdate(this.drawingData, this._blocks);
    }

    //Used to rename a field in a given block
    renameField(nodeId: string, path: Array<string>, newName: string): void {
        let thisBlock = this._blocks.reduce((t,n) => { return (n.id == nodeId) ? n : t;});
        let field = this.getTreeItem(thisBlock, path);
        field.name = newName;

        this.emitUpdate(this.drawingData, this._blocks);
    }

    //Used to remove a field in a given block
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

    //Used to locate a BlockModelField in a given block 
    private getTreeItem(block: IBlockModel, path: Array<string>): IBlockModelField {
        let root: IBlockModelField = block.modelFields;
    
        path.forEach((d, i) => {
            if(i==0) { return root; }
            root = root.children.reduce((t,n) => { return n.id == d ? n : t; }, {} as IBlockModelField)
        })
        return root;
    }

    //Used to notify any subscribers that an application config update occured
    private emitUpdate(diagramData?: IDrawing, blockData?: Array<IBlockModel>): void {
        this.drawingUpdated.emit({
            newDiagramData: diagramData || this.drawingData,
            newBlockData: blockData || this._blocks,
            appMode: this.appMode,
            editable: this.editable,
            drawingLayout: this.drawingLayout
        });
    }

    //Used to create a clone of a gallery block
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
}
