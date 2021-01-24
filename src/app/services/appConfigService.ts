import { EventEmitter, Injectable } from '@angular/core';
import { IAppConfig } from '../interfaces/IApplicationData';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { IBlockServiceModel } from '../models/configurationModels/IBlockServiceModel';

export interface IBlockDefinitions {
    blockServiceId: string;
    blockServiceType: string;
    blockServiceDisplayName: string;
    blocks: Array<any>;
}

export interface IBlockSettings {
    blockTemplateGuid: string,
    settings: { [id: string] : any; }
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    configUpdated = new EventEmitter<IAppConfig>();

    private _blockDefs: Array<any>;
    private _blockServiceTypes: Array<IBlockServiceModel>;
    private _blockSettings: Array<IBlockSettings>;

    constructor() {
        Promise.all([
            fetch('/resources/BlockDefinitions.json')
                .then(data => data.json()),
            fetch('/resources/BlockServiceTypes.json')
                .then(data => data.json()),
            fetch('/resources/FieldDefs.json')
                .then(data => data.json()),
            fetch('/resources/BlockTemplateSettings.json')
                .then(data => data.json())
        ]).then(data => {
            this._blockDefs = data[0];
            this._blockServiceTypes = data[1];
            this._blockSettings = data[3];

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

    getBlockSettingsByGuid(templateGuid: string): IBlockSettings {
        const data: any = this._blockSettings
            .reduce((t, n) => n.blockTemplateGuid == templateGuid ? n : t);
        return data ? data.settings : {};
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

    public getAppData(): IAppConfig {
        let blockDefs = (this._blockServiceTypes || []).map(d => { return {
            blockServiceId: d.serviceId,
            blockServiceType: d.serviceType,
            blockServiceDisplayName: d.serviceDisplayName,
            blocks: this._blockDefs.filter(f => f.blockServiceId == d.serviceId)
        }});

        return {
            blockDefs: blockDefs,
            serviceTypes: this._blockServiceTypes,
            fieldTypes: null,
            blockSettings: this._blockSettings
        };
    }

    private emitConfigUpdate(): void {
        const emitData: IAppConfig = this.getAppData();

        this.configUpdated.emit(emitData);
    }
}