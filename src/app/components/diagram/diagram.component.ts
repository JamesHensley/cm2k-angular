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
import { IDrawing } from '../../interfaces/IDrawing';
import { IBlock } from '../../interfaces/IBlock';
import { INode } from "src/app/interfaces/INode";

@Component({
    selector: "diagram-component",
    templateUrl: "./diagram.component.html",
    styleUrls: ["./diagram.component.scss"]
})

export class Diagram implements OnInit, OnDestroy {
    @ViewChild("diagramNode", { static: true }) private diagramNode: ElementRef;

    @Input()
    set drawing(val: IDrawing) { this._drawing = val; }
    get drawing() { return this._drawing; }

    private _drawing: IDrawing;

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    drawingClickHandler(evt): void {
        let elem = evt.target;
        while (!elem.classList.contains('node-group')) {
            elem = elem.parentElement;
            if(!elem) {
                // Couldn't locate the element; bail out
                return;
            }
        }

        const clickedNode = this._drawing.nodes
            .reduce((t: INode, n: INode) => {
                if(n.id == elem.getAttribute('id')) { return n; }
                return t;
            });

        console.log(elem, clickedNode);
    }

    exportDrawing(): void {
        console.log(this._drawing);
    }
}