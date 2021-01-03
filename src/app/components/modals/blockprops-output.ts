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
import { BlockModelOutput } from "src/app/models/BlockModelOutput";

@Component({
    selector: 'blockprops-output',
    templateUrl: 'blockprops-output.html',
    styleUrls: ["blockprops.scss"]
})

export class BlockPropsOutputDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelOutput) {
        console.log('BlockPropsDialog: ', blockData);
    }
}