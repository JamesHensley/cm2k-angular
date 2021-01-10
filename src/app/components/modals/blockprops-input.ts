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
import { DialogService } from "src/app/services/dialogservice";
import { DrawingUpdatedData, DrawingDataService } from "src/app/services/drawingdataservice";
import { InputData } from "./input-dialog";

@Component({
    selector: 'blockprops-input',
    templateUrl: 'blockprops-input.html',
    styleUrls: ["blockprops.scss"]
})

export class BlockPropsInputDialog implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public blockData: BlockModelInput,
        private dialogservice: DialogService,
        private drawingService: DrawingDataService) { }

    ngOnInit(): void {
        this.drawingService.drawingUpdated.subscribe((newData: DrawingUpdatedData) => {
            this.blockData = (newData.newBlockData.reduce((t, n) => (n.id == this.blockData.id ? n : t))) as BlockModelInput;
        });
    }

    get outputConnections(): Array<ILink> {
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