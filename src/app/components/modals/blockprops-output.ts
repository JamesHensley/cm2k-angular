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
import { BlockModelOutput } from "src/app/models/BlockModelOutput";

@Component({
    selector: 'blockprops-output',
    templateUrl: 'blockprops-output.html',
    styleUrls: ["blockprops.scss"]
})

export class BlockPropsOutputDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelOutput) {
        console.log('BlockPropsOutputDialog: ', blockData);
    }
    
    get inputConnections(): Array<IConnection> {
        return this.blockData.edgeInput.connections;
    }
}