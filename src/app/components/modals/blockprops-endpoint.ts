import {
    Component,
    Inject,
    OnInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
    Query
} from "@angular/core";
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";

@Component({
    selector: 'blockprops-endpoint',
    templateUrl: 'blockprops-endpoint.html',
    styleUrls: ["blockprops.scss"]
})

export class BlockPropsEndpointDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: BlockModelEndpoint) { console.log('BlockPropsDialog: ', data); }
}