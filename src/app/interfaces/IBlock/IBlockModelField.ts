export interface IBlockModelField {
    name: string;
    type: string;
    path: Array<string>;
    children?: Array<IBlockModelField>;
}