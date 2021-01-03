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
import { IConnection } from "src/app/interfaces/IConnection";
import { BlockModelInput } from "src/app/models/BlockModelInput";

@Component({
    selector: 'blockprops-input',
    templateUrl: 'blockprops-input.html',
    styleUrls: ["blockprops.scss"]
})

export class BlockPropsInputDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelInput) {
        console.log('BlockPropsInputDialog: ', blockData);
    }

    get outputConnections(): Array<IConnection> {
        return this.blockData.edgeOutput.connections;
    }
}