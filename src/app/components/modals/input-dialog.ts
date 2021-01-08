import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DropDownData {
    value: string;
    viewValue: string;
}
export interface InputData {
    dlgTitle: string;
    message: string;
    inputLabel?: string;
    inputVal?: string;
    dropDownLabel?: string;
    dropDownChoices?: Array<DropDownData>;
    dropDownVal?: string;
}

@Component({
    selector: 'input-dialog',
    templateUrl: './input-dialog.html',
    styleUrls: ['./input-dialog.scss']
})

export class InputDialog {
    @Output() saveVal = new EventEmitter();

    constructor(@Inject(MAT_DIALOG_DATA) public data: InputData) { }

    setVal(fieldName: string, ev): void {
        this.data[fieldName] = ev.target.value;
    }

    save(): void {
        console.log('Saving: ', this.data);
        this.saveVal.emit(this.data);
    }
}