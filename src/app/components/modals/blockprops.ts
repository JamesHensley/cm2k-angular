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

import { INode } from '../../interfaces/INode';
@Component({
    selector: 'blockprops',
    templateUrl: 'blockprops.html',
})

export class BlockPropsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: INode) { console.log('BlockPropsDialog: ', data); }
}