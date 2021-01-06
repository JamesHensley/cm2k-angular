import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IBlockModel } from 'src/app/interfaces/IBlock/IBlockModel';
import { IBlockModelField } from 'src/app/interfaces/IBlock/IBlockModelField';
import { ITreeNodeBlock } from 'src/app/interfaces/ITreeNodeBlock';
import { BlockModelField } from 'src/app/models/BlockModelField';
import { DrawingDataService } from 'src/app/services/drawingdataservice';
import { MappingService } from 'src/app/services/mappingService';
import { TreeComponent, treeItemAction } from './tree-component';


@Component({
    selector: 'block-props-fields-component',
    templateUrl: './blockpropsfieldscomponent.html',
    styleUrls: ['./blockpropsfieldscomponent.scss']
})

export class BlockPropsFieldsComponent implements OnInit {
  @ViewChild(TreeComponent) private treeComponent: TreeComponent;

  @Input() allowEdits: boolean;
  @Input() blockData: IBlockModel;

  treeData: Array<BlockModelField>;

  constructor(private drawingService: DrawingDataService, private mapper: MappingService) {

    /*
    this.treeData = [
      {
        name: 'Fruit',
        nodeType: '',
        children: [
          { name: 'Apple', nodeType: 'string' },
          { name: 'Banana', nodeType: 'string' },
          { name: 'Fruit loops', nodeType: 'string' }
        ]
      }
    ];
    */
  }

  ngOnInit(): void {
    let root = this.blockData.modelFields; //this.mapper.getFieldsFromBlockType(this.blockData);
    this.treeData = [root];
    console.log('BlockPropsFieldsComponent->ngOnInit: ', this.treeData);
  }

  treeItemAdded(data: treeItemAction): void {
    console.log('BlockPropsFieldsComponent->treeItemAdded: ', data);
    this.drawingService.addFieldToNode(this.blockData.id, data.nodePath, { name: 'NewField', type: data.actionData, children: [] } as IBlockModelField);
  }

  treeItemRemoved(data: treeItemAction): void {
    console.log('BlockPropsFieldsComponent->treeItemRemoved: ', data);
    this.drawingService.removeFieldFromNode(this.blockData.id, data.nodePath, null);
  }
}