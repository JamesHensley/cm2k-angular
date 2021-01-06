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
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";

@Component({
    selector: 'blockprops-endpoint',
    templateUrl: './blockprops-endpoint.html',
    styleUrls: ['./blockprops.scss']
})

export class BlockPropsEndpointDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelEndpoint) {
        // console.log('BlockPropsEndpointDialog: ', blockData.ToJSON());
    }

    get inputConnections(): Array<IConnection> {
        return this.blockData.edgeInput.connections;
    }

    get outputConnections(): Array<IConnection> {
        return this.blockData.edgeOutput.connections;
    }


}