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
    templateUrl: 'blockprops-endpoint.html',
    styleUrls: ["blockprops.scss"]
})

export class BlockPropsEndpointDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelEndpoint) {
        console.log('BlockPropsDialog: ', blockData);
        console.log('BlockPropsDialog inEdge: ', this.blockData.edges.get('in'));
        console.log('BlockPropsDialog outEdge: ', this.blockData.edges.get('out'));
    }

    get inputConnections(): Array<IConnection> {
        var xx = this.blockData.edges.get('in').connections;
        console.log('BlockPropsEndpointDialog-inputConnections', xx);
        return xx;
    }

    get outputConnections(): Array<IConnection> {
        var xx = this.blockData.edges.get('out').connections;
        console.log('BlockPropsEndpointDialog-outputConnections', xx);
        return xx;
    }
}