import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
    Query
} from "@angular/core";
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

import { IBlockModel } from "src/app/interfaces/IBlockModel";
import { INode } from "src/app/interfaces/INode";
import { ILink } from "src/app/interfaces/ILink";

import { Guid } from 'typescript-guid';
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";
import { Diagram } from '../diagram/diagram.component';
import { Toolbar } from '../toolbar/toolbar.component';
//import { BlockPropsEndpointDialog } from "../modals/blockprops-endpoint";
//import { LinkPropsDialog } from "../modals/linkprops";

import { DialogService } from '../../services/dialogservice';
import { BlockModelInput } from "src/app/models/BlockModelInput";
import { BlockModelOutput } from "src/app/models/BlockModelOutput";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})

export class Main implements OnInit, OnDestroy {
    @ViewChild("mainViewNode", { static: true }) private mainViewNode: ElementRef;
    @ViewChild(Diagram) private diagram: Diagram;
    @ViewChild(Toolbar) private toolbar: Toolbar;

    constructor(public nodeDialog: MatDialog, public linkDialog: MatDialog, private dialogService: DialogService) {}

    private _blocks: Array<IBlockModel> = [];

    appMode: string = 'Edit';

    drawingNodes: Array<INode> = [];
    drawingLinks: Array<ILink> = [];
    drawingEditable: boolean = false;
    drawingLayout: string = '';
    
    ngOnInit() {
        this.buildTestData();

        this.drawingNodes = this._blocks.reduce((t: Array<INode>, n: IBlockModel) => {
            return [].concat.apply(t, [n.GetNodeObj()]);
        }, []);
        this.drawingLinks = this._blocks.reduce((t: Array<ILink>, n: IBlockModel) => {
            return [].concat.apply(t, n.GetConnectionsObj());
        }, []);
        this.drawingLayout = 'dagre';
        this.drawingEditable = false;
    }

    ngOnDestroy() {

    }

    handleBtnClick(btnData: string) {
        switch(btnData) {
            case 'Export':
                this.diagram.exportDrawing();
                break;
            case 'SetMode':
                this.appMode = (this.appMode == "Edit") ? "View" : "Edit";
                this.drawingEditable = (this.appMode == "Edit");
                break;
            case 'AddNode':
                const block = new BlockModelEndpoint();
                block.guid = Guid.create().toString();
                this._blocks.push(block);

                this.drawingNodes = this._blocks.reduce((t: Array<INode>, n: IBlockModel) => {
                    return [].concat.apply(t, [n.GetNodeObj()]);
                }, []);
                break;
        }
    }

    handleDropDown(data: any) {
        this.drawingLayout = data;
    }



    openBlockProps(elem: INode): void {
        const dialogRef = this.dialogService.openNodeDialog(
            this._blocks.reduce((t,n) => { return (n.id == elem.id) ? n : t })
        );

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    openLinkProps(elem: ILink): void {
        /*
        const dialogRef = this.linkDialog.open(LinkPropsDialog, {
            data: elem
         });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
        */
    }

    private buildTestData(): void {
        let iBlock = new BlockModelInput();
        iBlock.guid = Guid.create().toString();
        this._blocks.push(iBlock)
        for(var i = 1; i < 4; i++) {
            const block = new BlockModelEndpoint();
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
}