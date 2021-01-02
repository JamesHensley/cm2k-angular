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
    @ViewChild("nodeMenuBtn") nodeMenu: MatMenuTrigger;
    @ViewChild("linkMenuBtn") linkMenu: MatMenuTrigger;
    //@ViewChild(MatMenuTrigger) nodeMenu: MatMenuTrigger;
    //@ViewChild(MatMenuTrigger) linkMenu: MatMenuTrigger;

    @Input()
    set appMode(val: string) {
        this._appMode = val;
        this.drawingEditable = val == "Edit";
    }

    @Input() drawingNodes: Array<INode> = [];
    @Input() drawingLinks: Array<ILink> = [];
    @Input() drawingEditable: boolean = false;

    @Output() nodeClicked = new EventEmitter();

    get appMode() { return this._appMode; }

    private _appMode: string = '';

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }

    drawingClickHandler(evt): void {
    }

    exportDrawing(): void {
        console.log("Diagram->exportDrawing");
    }

    openMenu(a, b): void {
        console.log('openMenu', a, b);
        this.nodeMenu.openMenu();

    }

    menuItemClicked(e: any, menuType: string, menuData: string): void {
        console.log('menuItemClicked', e);

        if(menuType == 'link') {
            console.log('Menu Item Choosen: ', e, menuType, menuData, this.linkMenu.menuData);
        }

        if(menuType == 'node') {
            console.log('Menu Item Choosen: ', e, menuType, menuData, this.nodeMenu.menuData);
        }
    }
}