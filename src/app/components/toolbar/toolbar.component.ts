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
import { AppConfigService, IAppConfig, IBlockDefinitions } from "src/app/services/appConfigService";
import { DialogService } from "src/app/services/dialogservice";
import { DrawingDataService, DrawingUpdatedData } from "src/app/services/drawingdataservice";
import { InputData } from "../modals/input-dialog";

export interface ToolBarBtnData {
    btnType: string;
    btnData: any;
}

@Component({
    selector: "toolbar-component",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.scss"]
})
export class Toolbar implements OnInit, OnDestroy {
    @ViewChild("toolbarNode", { static: true }) private toolbarNode: ElementRef;
    @Input() selectedLayout: any = {value: 'dagre', viewValue: 'dagre'};

    appBlockDefs: Array<IBlockDefinitions>;

    constructor(
        public drawingService: DrawingDataService, public appConfigService: AppConfigService,
        private dialogservice: DialogService
    ) {
        this.appMode = this.drawingService.appMode;
        this.layouts = this.appConfigService.DiagramLayouts;
    }

    layouts: Array<any>;
    appMode: string;

    ngOnInit() {
        this.appConfigService.configUpdated.subscribe((newConfig: IAppConfig) => {
            this.appBlockDefs = newConfig.blockDefs;
        });
        
        this.drawingService.drawingUpdated.subscribe((newData: DrawingUpdatedData) => {
            this.appMode = newData.appMode;
        });
    }

    ngOnDestroy() { }

    toolbarBtnClick(data: ToolBarBtnData): void {
        switch(data.btnType) {
            case 'LoadTestData':
                this.drawingService.LoadTestData();
                break;
            case 'Export':
                this.drawingService.exportDrawing();
                break;
            case 'SetMode':
                this.drawingService.editable = !this.drawingService.editable;
                break;
            case 'AddNode':
                let btnGuid = data.btnData.srcElement.getAttribute('aria-guid');
                const template = this.appConfigService.getBlockTemplateByGuid(btnGuid);
                let tempData = {
                    "serviceId": template.blockServiceId,
                    "guid": btnGuid
                }

                const dialogRef = this.dialogservice.openInputDialog({
                    dlgTitle: 'Adding New Block',
                    message: '',
                    inputVal: template.blockName,
                    inputLabel:'New Block Name',
                } as InputData);

                dialogRef.componentInstance.saveVal.subscribe((saveData: InputData) => {
                    this.drawingService.addBlockToDrawing(tempData.serviceId, tempData.guid, saveData.inputVal);
                    dialogRef.componentInstance.saveVal.unsubscribe();
                });
                break;
        }
    }

    toolbarDropdownChanged(e: string): void {
        this.drawingService.drawingLayout = this.selectedLayout;
    }
}
