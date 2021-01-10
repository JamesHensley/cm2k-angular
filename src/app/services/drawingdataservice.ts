
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
import { IFieldMap } from '../interfaces/IFieldMap';
import { BlockService } from './blockService';

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
        private appConfigService: AppConfigService,
        private blockService: BlockService
    ) {
        this.drawingLayout = 'dagre';
        this.editable = false;
        this.appMode = 'View';
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
                return [].concat.apply(t, [this.blockService.GetNodeObj(n)]);
            }, []),
            links: this._links
        } as IDrawing;
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
        lnk.fieldMappings = new Array<IFieldMap>();

        this._links.push(lnk);
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
        let block: IBlockModel = this.blockService.CloneBlockByTemplate(serviceId, blockGuid, blockName);
        console.log('addBlockToDrawing', block);
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
        const drawing = JSON.stringify({ 'blocks': this._blocks, 'links': this._links }, null, '  ');

        console.log("*  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *  EXPORT  *");
        console.log(drawing);
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



    LoadTestData(): void {
        //this.addBlockToDrawing('ff8c1eec-6735-c63a-14ce-6f4da2ccea42', '443965a6-3071-62e1-60b7-aa99b4747638', 'csvInput');
        //this.addBlockToDrawing('696a219e-58a8-1585-dd24-53e90670cfc7', 'd14ab94e-0037-4c66-9980-4b785099c6b1', 'csvOutput');
        //this.addBlockToDrawing('dc279a42-2b88-62eb-baa9-51f3d42885e3', '0ec538f6-e5c8-0d08-2264-025197be81fd', 'Qlix');
        this.LoadDrawing('/resources/testdata.json');
    }

    LoadDrawing(url: string): void {
        fetch(url)
            .then(data => data.json())
            .then(data => {
                data.blocks.forEach((b: IBlockModel) => {
                    const blk = this.blockService.GetBlockModel(b);
                    this._blocks.push(blk)
                });
                data.links.forEach((l: ILink) => {
                    this.addConnection(l.source, l.target, l.label);
                });                
            });
    }
}
