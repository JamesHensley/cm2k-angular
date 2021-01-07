import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface InputData {
    message: string;
    currentVal: string;
}

@Component({
    selector: 'input-dialog',
    templateUrl: './input-dialog.html',
    styleUrls: ['./input-dialog.scss']
})
export class InputDialog {
    @ViewChild("inpVal", { static: true }) private inputValNode: ElementRef;
    @Output() saveVal = new EventEmitter();

    constructor(@Inject(MAT_DIALOG_DATA) public data: InputData) {}

    save(): void {
        this.saveVal.emit(this.inputValNode.nativeElement.value);
    }
}