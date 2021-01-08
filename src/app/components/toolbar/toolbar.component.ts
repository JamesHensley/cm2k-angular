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
import { AppConfigService } from "src/app/services/appConfigService";
import { DialogService } from "src/app/services/dialogservice";
import { DrawingDataService } from "src/app/services/drawingdataservice";
import { InputData } from "../modals/input-dialog";

export interface ToolBarBtnData {
    btnType: string;
    btnData: string;
}

@Component({
    selector: "toolbar-component",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class Toolbar implements OnInit, OnDestroy {
    @ViewChild("toolbarNode", { static: true }) private toolbarNode: ElementRef;

    @Output() btnClicked = new EventEmitter();
    @Output() dropdownChanged = new EventEmitter();

    @Input() appMode: string ='View';
    @Input() selectedLayout: any = {value: 'dagre', viewValue: 'dagre'};

    constructor(
        public drawingService: DrawingDataService, public appConfigService: AppConfigService,
        private dialogservice: DialogService
    ) {}

    layouts: any[] = [
        {value: 'dagre', viewValue: 'dagre'},
        {value: 'colaForceDirected', viewValue: 'colaForceDirected'},
        {value: 'dagreNodesOnly', viewValue: 'dagreNodesOnly'}
    ];

    ngOnInit() { }

    ngOnDestroy() { }

    toolbarBtnClick(data: ToolBarBtnData): void {
        switch(data.btnType) {
            case 'Export':
                //this.diagram.exportDrawing();
                break;
            case 'SetMode':
                this.appMode = (this.appMode == "Edit") ? "View" : "Edit";
                //this.drawingEditable = (this.appMode == "Edit");
                this.drawingService.drawingData.editable = false;
                break;
            case 'AddNode':
                const dialogRef = this.dialogservice.openInputDialog({
                    dlgTitle: 'Adding New Block',
                    message: '',
                    inputVal: 'New Block',
                    inputLabel:'New Block Name',
                  } as InputData);
                  dialogRef.componentInstance.saveVal.subscribe((saveData: InputData) => {
                    this.drawingService.addNewBlock(data.btnData, saveData.inputVal);
                    dialogRef.componentInstance.saveVal.unsubscribe();
                  });
                break;
        }
    }

    toolbarDropdownChanged(e: string): void {
        console.log('Toolbar->toolbarDropdownChanged:', e, this.selectedLayout);
        this.dropdownChanged.emit(this.selectedLayout);
    }
}
