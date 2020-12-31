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


@Component({
    selector: "diagram-component",
    templateUrl: "./diagram.component.html",
    styleUrls: ["./diagram.component.scss"]
})

export class Diagram implements OnInit, OnDestroy {
    @ViewChild("diagramNode", { static: true }) private diagramNode: ElementRef;

    public hierarchicalGraph = {
        nodes: [
            { id: 'first', label: 'A' },
            { id: 'second', label: 'B' },
            { id: 'third', label: 'C' }
        ],
        links: [
            {
                id: 'a',
                source: 'first',
                target: 'second',
                label: 'is parent of'
            },
            {
                id: 'b',
                source: 'first',
                target: 'third',
                label: 'custom label'
            },
            {
                id: 'c',
                source: 'second',
                target: 'third',
                label: 'custom label'
            }
        ]
    };

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }
}