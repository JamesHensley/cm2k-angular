import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
//import { ITreeNodeBlock } from 'src/app/interfaces/ITreeNodeBlock';
import { IBlockModelField } from 'src/app/interfaces/IBlock/IBlockModelField';
import { IBlockModel } from 'src/app/interfaces/IBlock/IBlockModel';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  path: string;
  canAddChildren: boolean;
}

export interface treeItemAction {
  nodePath: Array<string>;
  nodeAction: string;
  actionData: string;
}

@Component({
  selector: 'tree-component',
  templateUrl: './tree-component.html',
  styleUrls: ['./tree-component.scss']
})


export class TreeComponent implements OnInit {
  @Input() blockRef: IBlockModel;
  @Input() allowEdits: boolean;
  @Input() treeData: Array<IBlockModelField>;

  @Output() treeItemAdded = new EventEmitter<treeItemAction>();
  @Output() treeItemRemoved = new EventEmitter<treeItemAction>();

  private _transformer = (node: IBlockModelField, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      path: JSON.stringify(node.path),
      canAddChildren: node.type == 'object'
    };
  }
  
  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
    this.dataSource.data = this.treeData;
    console.log('TreeComponent->ngOnInit: ', this.treeData);
  }

  private _activeField: string;
  private _activePath: Array<string>;
  canAddChildren: boolean;

  fieldClick(data: MouseEvent): void {
    this._activeField = (data.target as Element).getAttribute('aria-id');
    this._activePath = JSON.parse((data.target as Element).getAttribute('aria-path'));

    let actNode = this.blockRef.modelFields.GetFieldNode(this._activePath);
    this.canAddChildren = actNode.type === 'object';
    console.log('Can Add Children: ', this.canAddChildren);
  }

  fieldMenuClick(data): void {
    if(data.btnType == 'addChild') { this.addChild(data.btnData); }
  }

  private addChild(nodeType: string): void {
    console.log('TreeComponent->addChild: emitting - ', this._activePath);
    this.treeItemAdded.emit({ nodePath: this._activePath, nodeAction: 'add', actionData: nodeType });
  }
}