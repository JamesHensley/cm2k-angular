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

    @Input()
    set appMode(val: string) { this._appMode = val; }
    get appMode() { return this._appMode; }
    private _appMode: string = '';

    @Output() btnClicked = new EventEmitter();

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    toolbarBtnClick(e): void {
        console.log('Toolbar->toolbarBtnClick' + e);
        this.btnClicked.emit(e);
    }
}
