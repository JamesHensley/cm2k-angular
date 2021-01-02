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
import { MatMenuTrigger } from '@angular/material/menu';
import { INode } from "src/app/interfaces/INode";
import { ILink } from "src/app/interfaces/ILink";

@Component({
    selector: "diagram-component",
    templateUrl: "./diagram.component.html",
    styleUrls: ["./diagram.component.scss"]
})

export class Diagram implements OnInit, OnDestroy {
    @ViewChild("diagramNode", { static: true }) private diagramNode: ElementRef;
    @ViewChild(MatMenuTrigger) nodeMenu: MatMenuTrigger;

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

    get appMode() { return this._appMode; }

    activeElem: any = {};

    private _appMode: string = '';

    ngOnInit() { }

    ngOnDestroy() { }

    drawingClickHandler(evt): void {
        // console.log(evt);
    }

    diagramItemClicked(itemId: string): void {
        this.activeElem = [].concat.apply(this.drawingLinks, this.drawingNodes)
            .reduce((t: any, n: any) => { return (n.id == itemId) ? n : t});
    }

    menuItemClicked(menuType: string, menuData: string): void {
        if(menuType == 'link') {
            console.log('Menu Item Choosen: ', menuType, menuData, this.activeElem);
        }

        if(menuType == 'node') {
            console.log('Menu Item Choosen: ', menuType, menuData, this.activeElem);
            switch (menuData) {
                case 'props':
                    break;
                case 'iEdge':
                    this.manageEdge(this.activeElem as INode, 'input');
                    break;
                case 'oEdge':
                    this.manageEdge(this.activeElem as INode, 'output');
                    break;
                case 'remove':
                    break;                    
            }
        }
    }



    //#region MenuFunctions
        exportDrawing(): void { console.log("Diagram->exportDrawing"); }

        manageEdge(node: INode, side: string): void {}

        manageProcess(node: INode, side: string): void {}
    //#endregion
}