import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BlockPropsEndpointDialog } from '../components/modals/blockprops-endpoint';
import { BlockPropsInputDialog } from '../components/modals/blockprops-input';
import { BlockPropsOutputDialog } from '../components/modals/blockprops-output';

import { IBlockModel } from '../interfaces/IBlockModel';
import { BlockModelEndpoint } from '../models/BlockModelEndpoint';
import { BlockModelInput } from '../models/BlockModelInput';
import { BlockModelOutput } from '../models/BlockModelOutput';

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class BlockDialogService {
    constructor(
        public nodeDialog: MatDialog
    ) {}

    openBlock(blockModel: IBlockModel): MatDialogRef<any> {
        switch(blockModel.blockType) {
            case 'BlockModelEndpoint':
                return this.nodeDialog.open(BlockPropsEndpointDialog, {data: blockModel as BlockModelEndpoint });
            case 'BlockModelInput':
                return this.nodeDialog.open(BlockPropsInputDialog, {data: blockModel as BlockModelInput });
            case 'BlockModelOutput':
                return this.nodeDialog.open(BlockPropsOutputDialog, {data: blockModel as BlockModelOutput });
        }
        return null;
    }
}
