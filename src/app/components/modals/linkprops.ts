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
import { DrawingDataService } from "src/app/services/drawingdataservice";

@Component({
    selector: 'linkprops',
    templateUrl: 'linkprops.html',
})
export class LinkPropsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public linkData: ILink,
        private drawingService: DrawingDataService,
        private blockService: BlockService
    ) {
        this.srcBlock = this.drawingService.getBlockById(this.linkData.source);
        this.dstBlock = this.drawingService.getBlockById(this.linkData.target);
    }

    public srcBlock: IBlockModel;
    public dstBlock: IBlockModel;

    get srcFields(): Array<string> {
        //console.log(this.srcBlock.modelFields);
        //return this.srcBlock.modelFields.Flatten().map(d => d.name + ' ' + d.type );
        console.log('srcFields');
        return this.blockService.GetFields(this.srcBlock.modelFields)
            .map(d => d.name + ' ' + d.type );
    }

    get dstFields(): Array<string> {
        //console.log(this.dstBlock.modelFields);
        //return this.dstBlock.modelFields.Flatten().map(d => d.name + ' ' + d.type );
        console.log('dstFields');
        return this.blockService.GetFields(this.dstBlock.modelFields)
            .map(d => d.name + ' ' + d.type );
    }

    saveLink(ev): void {
        console.log('LinkPropsDialog->saveLink', this.linkData);
    }
}
