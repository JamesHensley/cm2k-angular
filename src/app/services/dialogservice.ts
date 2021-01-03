import { MatDialogRef } from '@angular/material/dialog';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { BlockDialogService } from './blockdialogservice';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class DialogService {
    constructor(
        private blockDialogService: BlockDialogService
    ) {}

    openNodeDialog(blockModel: IBlockModel): MatDialogRef<any> {
        return this.blockDialogService.openBlock(blockModel);
    }
    
    openLinkDialog(blockModel: IBlockModel): MatDialogRef<any> {
        return null;
    }
}