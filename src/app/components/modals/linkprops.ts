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
import { IBlockModel } from "src/app/interfaces/IBlock/IBlockModel";
import { ILink } from "src/app/interfaces/ILink";
import { BlockService } from "src/app/services/blockService";
import { DialogService } from "src/app/services/dialogservice";
import { DrawingDataService } from "src/app/services/drawingdataservice";
import { InputData } from "./input-dialog";

@Component({
    selector: 'linkprops',
    templateUrl: 'linkprops.html',
    styleUrls: ['./linkprops.scss']
})
export class LinkPropsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public linkData: ILink,
        private drawingService: DrawingDataService,
        private dialogservice: DialogService,
        private blockService: BlockService
    ) {
        this.srcBlock = this.drawingService.getBlockById(this.linkData.source);
        this.dstBlock = this.drawingService.getBlockById(this.linkData.target);
    }

    public srcBlock: IBlockModel;
    public dstBlock: IBlockModel;

    get srcFields(): Array<any> {
        return this.blockService.GetFields(this.srcBlock.modelFields)
            .map(d => { return { name: d.name, type: d.type, linked: null } });
    }

    get dstFields(): Array<any> {
        return this.blockService.GetFields(this.dstBlock.modelFields)
            .map(d => { return { name: d.name, type: d.type, linked: null } });
    }
    displayedColumns: string[] = [ 'name', 'type', 'linked' ];




    saveLink(ev): void {
        console.log('LinkPropsDialog->saveLink', this.linkData);
    }

    renameLink(): void {
        const dialogRef = this.dialogservice.openInputDialog({
            dlgTitle: 'Rename link [' + this.linkData.label + ']',
            message: '',
            inputVal: this.linkData.label,
            inputLabel:'New Link Name',
        } as InputData);
        
        dialogRef.componentInstance.saveVal.subscribe((saveData: InputData) => {
            this.drawingService.renameLink(this.linkData.id, saveData.inputVal);
            dialogRef.componentInstance.saveVal.unsubscribe();
        });
    }
}
