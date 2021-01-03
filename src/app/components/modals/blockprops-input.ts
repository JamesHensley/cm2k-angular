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
import { BlockModelInput } from "src/app/models/BlockModelInput";

@Component({
    selector: 'blockprops-input',
    templateUrl: 'blockprops-input.html',
    styleUrls: ["blockprops.scss"]
})

export class BlockPropsInputDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: BlockModelInput) { console.log('BlockPropsDialog: ', data); }
}