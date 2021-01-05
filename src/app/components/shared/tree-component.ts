import { Component, Input, OnInit } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ITreeNodeBlock } from 'src/app/interfaces/ITreeNodeBlock';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'tree-component',
  templateUrl: './tree-component.html',
  styleUrls: ['./tree-component.scss']
})

export class TreeComponent implements OnInit {
  @Input() allowEdits: boolean;
  @Input() treeData: Array<ITreeNodeBlock>;

  private _transformer = (node: ITreeNodeBlock, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.dataSource.data = this.treeData;
  }

  private _activeField: string;

  fieldClick(data: MouseEvent): void {
    this._activeField = (data.target as Element).getAttribute('aria-id');
  }

  fieldMenuClick(data): void {
    if(data.btnType == 'addChild') { this.addChild(data.btnData); }
  }

  private addChild(data: string): void {
    console.log('addChild: ', this._activeField, data);
  }
}