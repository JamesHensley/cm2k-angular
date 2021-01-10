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
import { MatDialog } from "@angular/material/dialog";
import { IBlockModel } from "src/app/interfaces/IBlock/IBlockModel";
import { IConnection } from "src/app/interfaces/IConnection";
import { ILink } from "src/app/interfaces/ILink";
import { AppConfigService } from "src/app/services/appConfigService";
import { DialogService } from "src/app/services/dialogservice";
import { DrawingDataService } from "src/app/services/drawingdataservice";
import { DropDownData, InputData } from "./input-dialog";

@Component({
    selector: 'block-edge-mgr',
    templateUrl: './block-edge-mgr.html',
    styleUrls: ['./blockprops.scss']
})
export class BlockEdgeMgr implements OnInit {
    constructor(
        private dialogservice: DialogService,
        private drawingService: DrawingDataService,
        private appConfigService: AppConfigService
    ) {}
    
    @Input() blockData: IBlockModel;
    @Input() connections: Array<ILink>;
    @Input() side: string;

    ngOnInit(): void {
        console.log('BlockEdgeMgr->ngOnInit');
    }

    addConnectionBtn(): void {
        const choices = this.drawingService.blocks
            .filter(f => f.id != this.blockData.id)
            .map(d => { return { viewValue: d.blockName, value: d.id } as DropDownData });

        const dialogRef = this.dialogservice.openInputDialog({
            dlgTitle: 'Add a new connection',
            inputLabel: 'Link Name',
            inputVal: 'New Link',
            dropDownLabel: 'Block Connection',
            dropDownChoices: choices
        } as InputData);

        dialogRef.componentInstance.saveVal.subscribe((saveData: InputData) => {
            if(this.side == "in") {
                this.drawingService.addConnection(saveData.dropDownVal, this.blockData.id, saveData.inputVal);
            }
            else {
                this.drawingService.addConnection(this.blockData.id, saveData.dropDownVal, saveData.inputVal);
            }

            dialogRef.componentInstance.saveVal.unsubscribe();
        });
    }

    linkClicked(ev: any): void {
        const linkId = ev.target.getAttribute('aria-id');
        this.dialogservice.openLinkDialog(this.drawingService.getLinkById(linkId));
    }
}