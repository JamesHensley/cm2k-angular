import { ArrayType } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Guid } from 'typescript-guid';
import { BlockTypes } from '../enums';
import { IBlockServiceModel } from '../models/configurationModels/blockServiceModel';

export interface IAppConfig {
    blockDefs: Array<any>,
    serviceTypes: Array<IBlockServiceModel>,
    fieldTypes: Array<any>
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    configUpdated = new EventEmitter<IAppConfig>();

    private _blockDefs: Array<any>;
    private _blockServiceTypes: Array<IBlockServiceModel>;
    private _fieldTypes: Array<any>;

    constructor() {
        Promise.all([
            fetch('/resources/BlockDefinitions.json')
                .then(data => data.json()),
            fetch('/resources/BlockServiceTypes.json')
                .then(data => data.json()),
            fetch('/resources/FieldDefs.json')
                .then(data => data.json())
        ]).then(data => {
            this._blockDefs = data[0];
            this._blockServiceTypes = data[1];
            this._fieldTypes = data[2];

            this.configUpdated.emit({
                blockDefs: data[0],
                serviceTypes: data[1],
                fieldTypes: data[2]
            });
        });
    }

    getBlockTypeId(blockType: string): IBlockServiceModel {
        return this._blockServiceTypes
            .reduce((t: IBlockServiceModel, n: IBlockServiceModel) => { return n.serviceType == blockType ? n : t });
    }

    get blockDefinitions(): Array<any> {
        return this._blockDefs;
    }

    get BlockServiceTypes(): Array<string> {
        return this._blockServiceTypes
            .map(d => d.serviceType)
            .filter((f,i,e) => e.indexOf(f) == i)
            .sort();
    }

    get DiagramLayouts(): Array<any> {
        return [
            {value: 'dagre', viewValue: 'dagre'},
            {value: 'colaForceDirected', viewValue: 'colaForceDirected'},
            {value: 'dagreNodesOnly', viewValue: 'dagreNodesOnly'}
        ]
    }
}