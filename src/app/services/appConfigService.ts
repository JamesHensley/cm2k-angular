import { ArrayType } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
//import { BlockTypes } from '../enums';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
    configUpdated = new EventEmitter();

    private _blockConfigs: Array<any>;
    private _blockServiceTypes: Array<any>;
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
            this._blockConfigs = data[0];
            this._blockServiceTypes = data[1];
            this._fieldTypes = data[2];
            this.configUpdated.emit({
                blockConfigs: data[0],
                serviceTypes: data[1],
                fieldTypes: data[2]
            });
        });
    }

    get blockConfigurations(): Array<any> {
        return this._blockConfigs;
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