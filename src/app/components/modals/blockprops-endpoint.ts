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
import { IDrawingData } from "src/app/interfaces/IDrawingData";
import { ILink } from "src/app/interfaces/ILink";
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";
import { DialogService } from "src/app/services/dialogservice";
import { DrawingDataService } from "src/app/services/drawingdataservice";
import { InputData } from "./input-dialog";

@Component({
    selector: 'blockprops-endpoint',
    templateUrl: './blockprops-endpoint.html',
    styleUrls: ['./blockprops.scss']
})
export class BlockPropsEndpointDialog implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelEndpoint,
        private dialogservice: DialogService,
        private drawingService: DrawingDataService) { }

    ngOnInit(): void {
        this.drawingService.drawingUpdated.subscribe((newData: IDrawingData) => {
            this.blockData = (newData.newBlockData.reduce((t, n) => (n.id == this.blockData.id ? n : t))) as BlockModelEndpoint;
        });
    }

    get inputConnections(): Array<ILink> {
        //return this.blockData.edgeInput.connections;
        return this.drawingService.getLinksForBlock(this.blockData.id).in;
    }

    get outputConnections(): Array<ILink> {
        //return this.blockData.edgeOutput.connections;
        return this.drawingService.getLinksForBlock(this.blockData.id).out;
    }

    renameBlock(): void {
        const dialogRef = this.dialogservice.openInputDialog({
            dlgTitle: 'Rename block [' + this.blockData.blockName + ']',
            message: '',
            inputVal: this.blockData.blockName,
            inputLabel:'New Block Name',
        } as InputData);
        dialogRef.componentInstance.saveVal.subscribe((saveData: InputData) => {
            this.drawingService.renameBlock(this.blockData.id, saveData.inputVal);
            dialogRef.componentInstance.saveVal.unsubscribe();
        });
    }

    saveBlock(ev): void {
        this.drawingService.saveNodeChanges();
    }
}