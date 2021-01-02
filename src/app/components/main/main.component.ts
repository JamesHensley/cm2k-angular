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

import { IBlockModel } from "src/app/interfaces/IBlockModel";
import { INode } from "src/app/interfaces/INode";
import { ILink } from "src/app/interfaces/ILink";

import { Guid } from 'typescript-guid';
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";
import { Diagram } from '../diagram/diagram.component';
import { Toolbar } from '../toolbar/toolbar.component';

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})

export class Main implements OnInit, OnDestroy {
    @ViewChild("mainViewNode", { static: true }) private mainViewNode: ElementRef;
    @ViewChild(Diagram) private diagram: Diagram;
    @ViewChild(Toolbar) private toolbar: Toolbar;

    private _blocks: Array<IBlockModel> = [];

    appMode: string = 'Edit';

    drawingNodes: Array<INode> = [];
    drawingLinks: Array<ILink> = [];
    drawingEditable: boolean = false;

    ngOnInit() {
        this.buildTestData();

        this.drawingNodes = this._blocks.reduce((t: Array<INode>, n: IBlockModel) => {
            return [].concat.apply(t, [n.GetNodeObj()]);
        }, []);
        this.drawingLinks = this._blocks.reduce((t: Array<ILink>, n: IBlockModel) => {
            return [].concat.apply(t, n.GetConnectionsObj());
        }, []);
    }

    ngOnDestroy() {

    }

    handleBtnClick(btnData: string) {
        console.log('Button Clicked: ' + btnData);
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

    private buildTestData(): void {
        for(var i = 0; i < 5; i++) {
            const block = new BlockModelEndpoint();
            block.guid = Guid.create().toString();
            this._blocks.push(block);
        }
        this._blocks[0].AddConnection(this._blocks[1]);
        this._blocks[1].AddConnection(this._blocks[2]);
        //this._blocks[1].AddConnection(this._blocks[3]);
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