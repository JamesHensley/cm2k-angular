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
import { DrawingDataService } from "src/app/services/drawingdataservice";

@Component({
    selector: 'blockprops-endpoint',
    templateUrl: './blockprops-endpoint.html',
    styleUrls: ['./blockprops.scss']
})

export class BlockPropsEndpointDialog implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelEndpoint,
    private drawingService: DrawingDataService) {
        // console.log('BlockPropsEndpointDialog: ', blockData.ToJSON());
    }

    ngOnInit(): void {
        this.drawingService.drawingUpdated.subscribe(newData => {
            this.blockData = newData.newBlockData.reduce((t, n) => (n.id == this.blockData.id ? n : t));
            console.log('Received a drawing UPDATED message', this.blockData);
        });
    }

    allowEdits: boolean = false;
    get inputConnections(): Array<IConnection> {
        return this.blockData.edgeInput.connections;
    }

    get outputConnections(): Array<IConnection> {
        return this.blockData.edgeOutput.connections;
    }

    saveBlock(ev): void {
        console.log('BlockPropsEndpointDialog->saveBlock: ', ev)
        throw new Error("BlockPropsEndpointDialog->saveBlock Method not implemented.");
    }
}