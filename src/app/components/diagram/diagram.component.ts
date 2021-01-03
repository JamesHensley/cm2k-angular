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
// import { MatMenuTrigger } from '@angular/material/menu';
//import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import { INode } from "src/app/interfaces/INode";
import { ILink } from "src/app/interfaces/ILink";

@Component({
    selector: "diagram-component",
    templateUrl: "./diagram.component.html",
    styleUrls: ["./diagram.component.scss"]
})

export class Diagram implements OnInit, OnDestroy {
    @ViewChild("diagramNode", { static: true }) private diagramNode: ElementRef;

    @Input()
    set appMode(val: string) {
        this._appMode = val;
        this.drawingEditable = val == "Edit";
    }

    @Input() drawingNodes: Array<INode> = [];
    @Input() drawingLinks: Array<ILink> = [];
    @Input() drawingEditable: boolean = false;
    @Input() drawingLayout: string = "";

    @Output() nodeClicked = new EventEmitter();
    @Output() linkClicked = new EventEmitter();

    get appMode() { return this._appMode; }
    isOpen: boolean = false;

    private _appMode: string = '';

   
    ngOnInit() { }

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
        exportDrawing(): void { console.log("Diagram->exportDrawing"); }

        manageEdge(node: INode, side: string): void {}

        manageProcess(node: INode, side: string): void {}
    //#endregion
}