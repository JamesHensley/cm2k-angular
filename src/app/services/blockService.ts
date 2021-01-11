import { EventEmitter, Injectable, Output } from '@angular/core';
import { Guid } from 'typescript-guid';
import { BlockTypes } from '../enums';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelField';
import { INode } from '../interfaces/INode';
import { BlockModelEndpoint } from '../models/BlockModelEndpoint';
import { BlockModelField } from '../models/BlockModelField';
import { BlockModelInput } from '../models/BlockModelInput';
import { BlockModelOutput } from '../models/BlockModelOutput';
import { AppConfigService } from './appConfigService';

@Injectable({ providedIn: 'root' })
export class BlockService {
    constructor(private appConfigService: AppConfigService) {
    }

    GetBlockModel(inp: IBlockModel): IBlockModel {
        const newBlock = this.CloneBlockByTemplate(inp.blockServiceId, inp.blockTemplateGuid, inp.blockName);

        newBlock.id = inp.id;
        newBlock.label = inp.label;

        return newBlock;
    }

    //Returns an INode for displaying on the drawing
    GetNodeObj(block: IBlockModel): INode {
        return {
            id: block.id,
            label: block.label || '',
            edges: []
        } as INode
    }

    //Flattens the field models into an array
    GetFields(blockModelField: IBlockModelField): Array<IBlockModelField> {
        const childMap = blockModelField.children.map(d => this.GetFields(d));
        return [].concat.apply([blockModelField], childMap);
    }

    //Used to create a clone of a gallery block
    CloneBlockByTemplate(serviceId: string, blockTemplateGuid: string, blockName: string): IBlockModel {
        let newBlock: IBlockModel;
        const block: IBlockModel = this.appConfigService.getBlockTemplateByGuid(blockTemplateGuid);

        let blockServiceType = this.appConfigService.getBlockServiceTypeFromServiceId(serviceId);
        if(blockServiceType == BlockTypes.INPUTBLOCK) { newBlock = new BlockModelInput(blockName, serviceId); }
        if(blockServiceType == BlockTypes.PROCESSORBLOCK) { newBlock = new BlockModelEndpoint(blockName, serviceId); }
        if(blockServiceType == BlockTypes.OUTPUTBLOCK) { newBlock = new BlockModelOutput(blockName, serviceId); }

        if(newBlock) {
            newBlock.blockTemplateGuid = blockTemplateGuid;
            //JSON.stringify(block.modelFields.children).replace
            newBlock.modelFields.children = JSON.parse(JSON.stringify(block.modelFields.children));
            
            newBlock.blockSettings = this.appConfigService.getBlockSettingsByGuid(blockTemplateGuid);
console.log('BlockService.CloneBlockByTemplate ', newBlock)
            return newBlock;
        }
        return null;
    }
}
