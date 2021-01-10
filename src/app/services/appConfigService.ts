import { ArrayType } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Guid } from 'typescript-guid';
import { BlockTypes } from '../enums';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';

import { IBlockServiceModel } from '../models/configurationModels/blockServiceModel';

export interface IAppConfig {
    blockDefs: Array<IBlockDefinitions>,
    serviceTypes: Array<IBlockServiceModel>,
    fieldTypes: Array<any>
}

export interface IBlockDefinitions {
    blockServiceId: string;
    blockServiceType: string;
    blockServiceDisplayName: string;
    blocks: Array<any>;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    configUpdated = new EventEmitter<IAppConfig>();

    private _blockDefs: Array<any>;
    private _blockServiceTypes: Array<IBlockServiceModel>;

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

            this.emitConfigUpdate();
        });
    }

    getBlockServiceIdFromServiceType(serviceType: string): string {
        return this._blockServiceTypes
            .reduce((t: string, n: IBlockServiceModel) => {
                return (n.serviceType == serviceType ? n.serviceId : t)
            }, null);
    }

    getBlockServiceTypeFromServiceId(serviceId: string): string {
        return this._blockServiceTypes
            .reduce((t: string, n: IBlockServiceModel) => {
                return (n.serviceId == serviceId ? n.serviceType : t)
            }, null);
    }

    getBlockTemplateByGuid(templateGuid: string): IBlockModel {
        return this._blockDefs
            .reduce((t: IBlockModel, n: IBlockModel) => {
                return n.blockTemplateGuid == templateGuid ? n : t
            }, null);
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

    private emitConfigUpdate(): void {
        let blockDefs = (this._blockServiceTypes || []).map(d => { return {
            blockServiceId: d.serviceId,
            blockServiceType: d.serviceType,
            blockServiceDisplayName: d.serviceDisplayName,
            blocks: this._blockDefs.filter(f => f.blockServiceId == d.serviceId)
        }});

        this.configUpdated.emit({
            blockDefs: blockDefs,
            serviceTypes: this._blockServiceTypes,
            fieldTypes: null
        });
    }
}