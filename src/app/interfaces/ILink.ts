import { IFieldMap } from "./IFieldMap";

export interface ILink {
    id: string,
    source: string;
    target: string;
    label: string;
    fieldMappings: Array<IFieldMap>;
}