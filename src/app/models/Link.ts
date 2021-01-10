import { Guid } from "typescript-guid";
import { ILink } from "../interfaces/ILink";

export class Link implements ILink {
    id: string;
    source: string;
    target: string;
    label: string;

    constructor(id?: string) {
        if (!id) {
            this.id = 'L-' + (Guid.create().toString().replace(/\-/ig, ""));
        }
    }
}