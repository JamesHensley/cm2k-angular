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
import { Guid } from 'typescript-guid';

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
      this.dataSource.data = [this.blockData.modelFields];
      this.treeControl.expandAll();
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
    if(data.btnType == 'AddChild') { this.addChild(); }
    if(data.btnType == 'RenameField') { this.renameField(); }
    if(data.btnType == 'RemoveBranch') { this.removeBranch(); }
  }

  private addChild(): void {
    //this.treeItemAdded({ nodePath: this._activePath, nodeAction: 'add', actionData: nodeType } as treeItemAction);
    const dialogRef = this.dialogservice.openInputDialog({
      dlgTitle: 'Adding child to [' + this._activeNode.name + ']',
      message: '',
      inputVal: 'newfield',
      inputLabel:'New Field Name',
      dropDownChoices: [
        { value: 'object', viewValue: 'object' },
        { value: 'string', viewValue: 'string' },
        { value: 'number', viewValue: 'number' },
        { value: 'boolean', viewValue: 'boolean' },
        { value: 'array', viewValue: 'array' }
      ],
      dropDownLabel: 'New Field Type',
      dropDownVal: 'object'
    } as InputData);
    dialogRef.componentInstance.saveVal.subscribe((saveData: InputData) => {
      let newNode = new BlockModelField(saveData.inputVal, saveData.dropDownVal);
      this.drawingService.addFieldToNode(this.blockData.id, this._activePath, newNode);
      dialogRef.componentInstance.saveVal.unsubscribe();
    });
  }

  private renameField(): void {
    const dialogRef = this.dialogservice.openInputDialog({
      dlgTitle: 'Renaming field [' + this._activeNode.name + ']',
      message: '',
      inputVal: this._activeNode.name,
      inputLabel:'Field Name',
    } as InputData);
    dialogRef.componentInstance.saveVal.subscribe((saveData: InputData) => {
      this.drawingService.renameField(this.blockData.id, this._activePath, saveData.inputVal);
      dialogRef.componentInstance.saveVal.unsubscribe();
    });
  }

  private removeBranch(): void {
    this.drawingService.removeFieldFromNode(this.blockData.id, this._activePath);
  }
}