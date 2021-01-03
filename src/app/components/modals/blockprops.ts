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
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IBlockModel } from "src/app/interfaces/IBlockModel";

@Component({
    selector: 'blockprops',
    templateUrl: 'blockprops.html',
})

export class BlockPropsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: IBlockModel) { console.log('BlockPropsDialog: ', data); }
}