import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { BlockDialogService } from './blockdialogservice';
import { Injectable } from '@angular/core';

import { InputDialog, InputData } from '../components/modals/input-dialog';

@Injectable({
    providedIn: 'root',
})

export class DialogService {
    constructor(
        private blockDialogService: BlockDialogService,
        public inputDialog: MatDialog
    ) {}

    openNodeDialog(blockModel: IBlockModel): MatDialogRef<any> {
        return this.blockDialogService.openBlock(blockModel);
    }
    
    openLinkDialog(blockModel: IBlockModel): MatDialogRef<any> {
        return null;
    }

    openInputDialog(inputData: InputData) {
        return this.inputDialog.open(InputDialog, { data: inputData });
    }
}