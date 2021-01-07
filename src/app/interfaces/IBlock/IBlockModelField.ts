export interface IBlockModelField {
    id: string;
    name: string;
    type: string;
    path: Array<string>;
    children?: Array<IBlockModelField>;
}