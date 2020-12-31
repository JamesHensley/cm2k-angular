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
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})

export class Main implements OnInit, OnDestroy {
    @ViewChild("mainViewNode", { static: true }) private mainViewNode: ElementRef;

    public xx: BlockModelEndpoint;
    ngOnInit() {
        this.xx = { url: 'Jimmy123' } as BlockModelEndpoint;
    }

    ngOnDestroy() {

    }
}