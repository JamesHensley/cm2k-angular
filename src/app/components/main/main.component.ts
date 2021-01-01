import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
    Query
  } from "@angular/core";
import { Guid } from 'typescript-guid';

import { IDrawing } from "src/app/interfaces/IDrawing";
import { IBlock } from 'src/app/interfaces/IBlock';
import { ILink } from "src/app/interfaces/ILink";
import { IBlockModel } from "src/app/interfaces/IBlockModel";
import { IConnection } from 'src/app/interfaces/IConnection';
import { BlockModelEndpoint } from "src/app/models/BlockModelEndpoint";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})

export class Main implements OnInit, OnDestroy {
    @ViewChild("mainViewNode", { static: true }) private mainViewNode: ElementRef;

    private _drawing: IDrawing;
    private _blocks: Array<IBlockModel> = [];

    get drawing() { return this._drawing; }

    ngOnInit() {
        this.buildTestData();

        this._drawing = {
            nodes: this._blocks.reduce((t: Array<IBlock>, n: IBlockModel) => {
                return [].concat.apply(t, [n.GetNodeObj()]);
            }, []),
            links: this._blocks.reduce((t: Array<ILink>, n: IBlockModel) => {
                return [].concat.apply(t, n.GetConnectionsObj());
            }, []),
            editable: false
        } as IDrawing;
        console.log('Built Drawing: ', this._drawing);
    }

    ngOnDestroy() {

    }

    btnClickExport(): void {

    }

    private buildTestData(): void {
        for(var i = 0; i < 5; i++) {
            const block = new BlockModelEndpoint();
            block.guid = Guid.create().toString();
            this._blocks.push(block);
        }
        this._blocks[0].AddConnection(this._blocks[1]);
        this._blocks[1].AddConnection(this._blocks[2]);
        this._blocks[1].AddConnection(this._blocks[3]);
        this._blocks[1].AddConnection(this._blocks[4]);

        this._blocks[2].AddConnection(this._blocks[3]);
        this._blocks[2].AddConnection(this._blocks[4]);
        this._blocks[3].AddConnection(this._blocks[4]);

        this._blocks[0].label = 'inputCSV';
        this._blocks[1].label = 'Q';
        this._blocks[2].label = 'RS';
        this._blocks[3].label = 'D';
        this._blocks[4].label = 'outputCSV';
    }
}