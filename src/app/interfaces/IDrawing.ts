import { INode } from './INode';
import { ILink } from './ILink';
import { IBlock } from './IBlock';
import { EventEmitter } from '@angular/core';

export interface IDrawing {
    nodes: Array<IBlock>,
    links: Array<ILink>,
    editable: boolean
}
