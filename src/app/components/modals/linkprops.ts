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
import { ILink } from "src/app/interfaces/ILink";

@Component({
    selector: 'linkprops',
    templateUrl: 'linkprops.html',
})

export class LinkPropsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ILink) { console.log('LinkPropsDialog: ', data); }

    saveLink(ev): void {
        console.log('LinkPropsDialog->saveLink');
    }
}
