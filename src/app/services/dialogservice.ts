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
import { AppConfigService } from './appConfigService';
import { BlockTypes } from '../enums';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(
        public nodeDialog: MatDialog,
        public inputDialog: MatDialog,
        private appConfigService: AppConfigService
    ) {}

    openNodeDialog(blockModel: IBlockModel): MatDialogRef<any> {
        switch(blockModel.blockServiceType) {
            case BlockTypes.PROCESSORBLOCK:
                return this.nodeDialog.open(BlockPropsEndpointDialog, {data: blockModel as BlockModelEndpoint });
            case BlockTypes.INPUTBLOCK:
                return this.nodeDialog.open(BlockPropsInputDialog, {data: blockModel as BlockModelInput });
            case BlockTypes.OUTPUTBLOCK:
                return this.nodeDialog.open(BlockPropsOutputDialog, {data: blockModel as BlockModelOutput });
            default:
                throw new Error ("DialogService->openNodeDialog: Could not identify block type");
        }
    }
    
    openLinkDialog(blockModel: IBlockModel): MatDialogRef<any> {
        return null;
    }

    openInputDialog(inputData: InputData) {
        return this.inputDialog.open(InputDialog, { data: inputData });
    }
}