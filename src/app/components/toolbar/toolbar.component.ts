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
    selector: "toolbar-component",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})


export class Toolbar implements OnInit, OnDestroy {
    @ViewChild("toolbarNode", { static: true }) private toolbarNode: ElementRef;

    @Output() btnClicked = new EventEmitter();
    @Output() dropdownChanged = new EventEmitter();

    @Input() appMode: string ='View';
    @Input() selectedLayout: any = {value: 'dagre', viewValue: 'dagre'};

    layouts: any[] = [
        {value: 'dagre', viewValue: 'dagre'},
        {value: 'colaForceDirected', viewValue: 'colaForceDirected'},
        {value: 'dagreNodesOnly', viewValue: 'dagreNodesOnly'}
    ];

    ngOnInit() { }

    ngOnDestroy() { }

    toolbarBtnClick(e: string): void {
        //console.log('Toolbar->toolbarBtnClick' + e);
        this.btnClicked.emit(e);
    }

    toolbarDropdownChanged(e: string): void {
        console.log('Toolbar->toolbarDropdownChanged:', e, this.selectedLayout);
        this.dropdownChanged.emit(this.selectedLayout);
    }
}
