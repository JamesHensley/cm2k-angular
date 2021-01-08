import { Guid } from "typescript-guid";
import { IBlockModelField } from "../interfaces/IBlock/IBlockModelField";

export class BlockModelField implements IBlockModelField {
    id: string;
    name: string;
    type: string;
    path: string[];
    children?: IBlockModelField[];

    constructor(name: string, type: string, path?: Array<string>, children?: Array<IBlockModelField>, id?: string) {
        this.id = id || Guid.create().toString();
        this.name = name;
        this.type = type;
        this.path = path || new Array<string>();
        this.children = children || new Array<IBlockModelField>();
    }

    GetFieldNode(path: Array<string>): IBlockModelField {
        let root: IBlockModelField = this;

        path.forEach((d, i) => {
            if(i==0) { return root; }
            root = root.children.reduce((t,n) => { return n.id == d ? n : t; }, {} as IBlockModelField)
        })
        return root;
    }

}