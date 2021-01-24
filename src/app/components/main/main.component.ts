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

import { Diagram } from '../diagram/diagram.component';
import { Toolbar } from '../toolbar/toolbar.component';

import { DialogService } from '../../services/dialogservice';
import { DrawingDataService } from "src/app/services/drawingdataservice";
import { AppConfigService } from "src/app/services/appConfigService";

//declare var initIDSTListener: any;

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})

export class Main implements OnInit, OnDestroy {
    @ViewChild("mainViewNode", { static: true }) private mainViewNode: ElementRef;
    //@ViewChild(Diagram) private diagram: Diagram;
    //@ViewChild(Toolbar) private toolbar: Toolbar;

    constructor(
        public drawingService: DrawingDataService, public appConfigService: AppConfigService,
        public nodeDialog: MatDialog, public linkDialog: MatDialog, private dialogService: DialogService
    ) {
    }

    appMode: string = 'Edit';

    drawingNodes: Array<INode> = [];
    drawingLinks: Array<ILink> = [];
    drawingEditable: boolean = false;
    drawingLayout: string = '';
    
    ngOnInit() {
        this.appConfigService.configUpdated.subscribe(newConfig => {
            console.log('Main->Configuration Updated: ', newConfig);
        });
        
        this.drawingNodes = this.drawingService.drawingData.nodes;
        this.drawingLinks = this.drawingService.drawingData.links;
        this.drawingLayout = 'dagre';
        this.drawingEditable = false;
    }

    ngOnDestroy() {

    }

    //Called when a user clicks on a node on the drawing
    openBlockProps(elem: INode): void {
        const block = this.drawingService.getBlockById(elem.id);
        this.dialogService.openNodeDialog(block);
    }

    //Called when a user clicks on a node on the drawing
    openLinkProps(elem: ILink): void {
        const link = this.drawingService.getLinkById(elem.id);
        this.dialogService.openLinkDialog(link);
    }
}