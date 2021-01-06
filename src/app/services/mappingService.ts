import { Injectable } from '@angular/core';
import { IBlockModel } from '../interfaces/IBlock/IBlockModel';
import { IBlockModelField } from '../interfaces/IBlock/IBlockModelField';

@Injectable({
    providedIn: 'root',
})
export class MappingService {

    //This is a temporary solution until the models are defined
    XXXXgetFieldsFromBlockType(block: IBlockModel): IBlockModelField {
        let root = { name: block.label, type: 'object', path: [block.label], children: [
            { name: 'web', type: 'object', path: [block.label, 'web'], children: [
                { name: 'url', type: 'string', path: [block.label, 'web', 'url'], children: [] } as IBlockModelField,
                { name: 'timeout', type: 'number', path: [block.label, 'web', 'timeout'], children: [] } as IBlockModelField
            ] } as IBlockModelField
        ] } as IBlockModelField;
        return root;
    }
}