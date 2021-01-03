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

import { IBlockModel } from "src/app/interfaces/IBlock/IBlockModel";
import { INode } from "src/app/interfaces/INode";
import { ILink } from "src/app/interfaces/ILink";

import { Guid } from 'typescript-guid';
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";
import { Diagram } from '../diagram/diagram.component';
import { Toolbar } from '../toolbar/toolbar.component';

import { DialogService } from '../../services/dialogservice';
import { DrawingDataService } from "src/app/services/drawingdataservice";
import { blockTypes } from '../../enums';
@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})

export class Main implements OnInit, OnDestroy {
    @ViewChild("mainViewNode", { static: true }) private mainViewNode: ElementRef;
    @ViewChild(Diagram) private diagram: Diagram;
    @ViewChild(Toolbar) private toolbar: Toolbar;

    constructor(
        public drawingService: DrawingDataService,
        public nodeDialog: MatDialog, public linkDialog: MatDialog, private dialogService: DialogService
    ) {}

    private _blocks: Array<IBlockModel> = [];

    appMode: string = 'Edit';

    drawingNodes: Array<INode> = [];
    drawingLinks: Array<ILink> = [];
    drawingEditable: boolean = false;
    drawingLayout: string = '';
    
    ngOnInit() {
        this.drawingNodes = this.drawingService.drawingData.nodes;
        this.drawingLinks = this.drawingService.drawingData.links;
        this.drawingLayout = 'dagre';
        this.drawingEditable = false;
    }

    ngOnDestroy() {

    }

    handleBtnClick(data: any) {
        switch(data.btnType) {
            case 'Export':
                this.diagram.exportDrawing();
                break;
            case 'SetMode':
                this.appMode = (this.appMode == "Edit") ? "View" : "Edit";
                this.drawingEditable = (this.appMode == "Edit");
                break;
            case 'AddNode':
                this.drawingService.addNode(data.btnData);
                break;
        }
    }

    handleDropDown(data: any) {
        this.drawingLayout = data;
    }



    openBlockProps(elem: INode): void {
        const block = this.drawingService.block(elem.id)
        const dialogRef = this.dialogService.openNodeDialog(block);

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
}