import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { Injectable } from '@angular/core';

import { BlockPropsEndpointDialog } from '../components/modals/blockprops-endpoint';
import { BlockPropsInputDialog } from '../components/modals/blockprops-input';
import { BlockPropsOutputDialog } from '../components/modals/blockprops-output';
import { InputDialog, InputData } from '../components/modals/input-dialog';

import { BlockModelEndpoint } from '../models/BlockModelEndpoint';
import { BlockModelInput } from '../models/BlockModelInput';
import { BlockModelOutput } from '../models/BlockModelOutput';

@Injectable({
    providedIn: 'root',
})

export class DialogService {
    constructor(
        public nodeDialog: MatDialog,
        public inputDialog: MatDialog
    ) {}

    openNodeDialog(blockModel: IBlockModel): MatDialogRef<any> {
        switch(blockModel.blockType) {
            case 'BlockModelEndpoint':
                return this.nodeDialog.open(BlockPropsEndpointDialog, {data: blockModel as BlockModelEndpoint });
            case 'BlockModelInput':
                return this.nodeDialog.open(BlockPropsInputDialog, {data: blockModel as BlockModelInput });
            case 'BlockModelOutput':
                return this.nodeDialog.open(BlockPropsOutputDialog, {data: blockModel as BlockModelOutput });
        }
    }
    
    openLinkDialog(blockModel: IBlockModel): MatDialogRef<any> {
        return null;
    }

    openInputDialog(inputData: InputData) {
        return this.inputDialog.open(InputDialog, { data: inputData });
    }
}