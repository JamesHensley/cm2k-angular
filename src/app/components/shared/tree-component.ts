import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
//import { ITreeNodeBlock } from 'src/app/interfaces/ITreeNodeBlock';
import { IBlockModelField } from 'src/app/interfaces/IBlock/IBlockModelField';
import { IBlockModel } from 'src/app/interfaces/IBlock/IBlockModel';
import { DrawingDataService } from 'src/app/services/drawingdataservice';
import { MappingService } from 'src/app/services/mappingService';
import { BlockModelField } from 'src/app/models/BlockModelField';
import { DialogService } from 'src/app/services/dialogservice';
import { InputData } from '../modals/input-dialog';

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
  @Input() blockData: IBlockModel;
  @Input() allowEdits: boolean;

  constructor(private drawingService: DrawingDataService,
    private mapper: MappingService,
    private dialogservice: DialogService) { }

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
    this.dataSource.data = [this.blockData.modelFields];

    this.drawingService.drawingUpdated.subscribe(newData => {
      this.blockData = newData.newBlockData.reduce((t, n) => (n.id == this.blockData.id ? n : t));;
      console.log('TreeComponent->Received a drawing UPDATED message (treeControl): ', this.treeControl);
      //console.log('TreeComponent->Received a drawing UPDATED message (blockData): ', this.blockData);
      this.dataSource.data = [this.blockData.modelFields];
      this.treeControl.expandAll();
      //this.treeFlattener.getChildren(this._activeNode)
    });
  }

  private _activeField: string;
  private _activePath: Array<string>;
  private _activeNode: IBlockModelField;
  canAddChildren: boolean;
  canModify: boolean;

  fieldClick(data: MouseEvent): void {
    this._activeField = (data.target as Element).getAttribute('aria-id');
    this._activePath = JSON.parse((data.target as Element).getAttribute('aria-path'));
    this._activeNode = this.blockData.modelFields.GetFieldNode(this._activePath);

    this.canAddChildren = this._activeNode.type === 'object';
    this.canModify = this._activeNode !== this.blockData.modelFields;
  }

  fieldMenuClick(data): void {
    if(data.btnType == 'addChild') { this.addChild(data.btnData); }
    if(data.btnType == 'RenameField') { this.renameField(); }
  }

  private addChild(nodeType: string): void {
    this.treeItemAdded({ nodePath: this._activePath, nodeAction: 'add', actionData: nodeType } as treeItemAction);
  }

  private renameField(): void {
    const dialogRef = this.dialogservice.openInputDialog({ message: 'New Field Name', currentVal: this._activeNode.name } as InputData);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('TreeComponent->renameField: ');
      }
    })
    
    dialogRef.componentInstance.closing.subscribe(saveData => {
      console.log('Received SaveData Event: ', saveData)
    })
  }

  treeItemAdded(data: treeItemAction): void {
    console.log('BlockPropsFieldsComponent->treeItemAdded: ', data);
    let newNode = new BlockModelField('NewField', data.actionData, data.nodePath, []);
    //this.drawingService.addFieldToNode(this.blockData.id, data.nodePath, { name: 'NewField', type: data.actionData, children: [] } as IBlockModelField);
    this.drawingService.addFieldToNode(this.blockData.id, data.nodePath, newNode);
  }

  treeItemRemoved(data: treeItemAction): void {
    console.log('BlockPropsFieldsComponent->treeItemRemoved: ', data);
    this.drawingService.removeFieldFromNode(this.blockData.id, data.nodePath, null);
  }

}