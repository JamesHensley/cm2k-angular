import { Component, Input, OnInit } from '@angular/core';
import { IBlockModel } from 'src/app/interfaces/IBlock/IBlockModel';
import { ITreeNodeBlock } from 'src/app/interfaces/ITreeNodeBlock';

@Component({
    selector: 'block-props-fields-component',
    templateUrl: './blockpropsfieldscomponent.html',
    styleUrls: ['./blockpropsfieldscomponent.scss']
})

export class BlockPropsFieldsComponent {
  @Input() allowEdits: boolean;
  @Input() blockData: IBlockModel;
  treeData: Array<ITreeNodeBlock>;

  constructor() {
    this.treeData = [
      {
        name: 'Fruit',
        children: [
          { name: 'Apple' },
          { name: 'Banana' },
          { name: 'Fruit loops' },
        ]
      }
    ];
  }

}