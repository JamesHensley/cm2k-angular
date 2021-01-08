import { INode } from './INode';
import { ILink } from './ILink';
import { EventEmitter } from '@angular/core';

export interface IDrawing {
    nodes: Array<INode>;
    links: Array<ILink>;
    /*
    editable: boolean;
    appMode: string;
    drawingLayout: string; 
    */
}
