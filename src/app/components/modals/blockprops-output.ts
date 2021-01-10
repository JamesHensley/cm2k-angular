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
import { ILink } from "src/app/interfaces/ILink";
import { BlockModelInput } from "src/app/models/BlockModelInput";
import { BlockModelOutput } from "src/app/models/BlockModelOutput";
import { DialogService } from "src/app/services/dialogservice";
import { DrawingDataService, DrawingUpdatedData } from "src/app/services/drawingdataservice";
import { InputData } from "./input-dialog";

@Component({
    selector: 'blockprops-output',
    templateUrl: 'blockprops-output.html',
    styleUrls: ["blockprops.scss"]
})
export class BlockPropsOutputDialog implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelOutput,
        private dialogservice: DialogService,
        private drawingService: DrawingDataService) { }

    ngOnInit(): void {
        this.drawingService.drawingUpdated.subscribe((newData: DrawingUpdatedData) => {
            this.blockData = (newData.newBlockData.reduce((t, n) => (n.id == this.blockData.id ? n : t))) as BlockModelOutput;
        });
    }

    get inputConnections(): Array<ILink> {
        return this.drawingService.getLinksForBlock(this.blockData.id).in;
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