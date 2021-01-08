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

import { INode } from "src/app/interfaces/INode";
import { ILink } from "src/app/interfaces/ILink";
import { DrawingDataService, DrawingUpdatedData } from "src/app/services/drawingdataservice";
import { IDrawing } from "src/app/interfaces/IDrawing";

@Component({
    selector: "diagram-component",
    templateUrl: "./diagram.component.html",
    styleUrls: ["./diagram.component.scss"]
})

export class Diagram implements OnInit, OnDestroy {
    @ViewChild("diagramNode", { static: true }) private diagramNode: ElementRef;

    @Input() drawingNodes: Array<INode> = [];
    @Input() drawingLinks: Array<ILink> = [];

    @Output() nodeClicked = new EventEmitter();
    @Output() linkClicked = new EventEmitter();

    constructor( private drawingService: DrawingDataService ) {
        this.drawingLayout = this.drawingService.drawingLayout;
        this.appMode = this.drawingService.appMode;
        this.drawingEditable = this.drawingService.editable;
    }

    appMode: string;
    drawingEditable: boolean;
    drawingLayout: string;
    isOpen: boolean = false;

    ngOnInit() {
        this.drawingService.drawingUpdated.subscribe((newData: DrawingUpdatedData) => {
            this.drawingNodes = newData.newDiagramData.nodes;
            this.drawingLinks = newData.newDiagramData.links;
            this.appMode = newData.appMode;
            this.drawingEditable = newData.editable;
            this.drawingLayout = newData.drawingLayout;
        })
    }

    ngOnDestroy() { }

    drawingClickHandler(evt): void { }


    diagramItemClicked(itemType: string, itemId: string): void {
        const activeElem = [].concat.apply(this.drawingLinks, this.drawingNodes)
            .reduce((t: any, n: any) => { return (n.id == itemId) ? n : t});
        console.log(activeElem);
        switch(itemType) {
            case 'node':
                this.nodeClicked.emit(activeElem as INode);
                break;
            case 'link':
                this.linkClicked.emit(activeElem as ILink);
                break;
        }
    }



    //#region MenuFunctions
        manageEdge(node: INode, side: string): void {}

        manageProcess(node: INode, side: string): void {}
    //#endregion
}