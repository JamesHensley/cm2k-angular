import { Injectable } from "@angular/core";
import { IAppConfig } from "../interfaces/IApplicationData";
import { ICommSet, ICommunicationData } from "../interfaces/ICommunicationData";
import { IDrawingData } from "../interfaces/IDrawingData";
import { AppConfigService } from "./appConfigService";
import { DrawingDataService } from "./drawingdataservice";

@Injectable({ providedIn: 'root' })
export class IdstFlowService {    
    get boundObject() {
        return window['idstObj'];
    };

    constructor(private drawingdataservice: DrawingDataService, private appConfigService: AppConfigService) {
        this.appConfigService.configUpdated.subscribe((data: IAppConfig) => {
            this.raise('AppDataUpdate', JSON.stringify(data));
        });
        
        this.drawingdataservice.drawingUpdated.subscribe((data: IDrawingData) => {
            this.raise('DrawingDataUpdate', JSON.stringify(data));
        })

        window.addEventListener('IDSTAFlow', (data: any) => {
            this.processDotNetInstruction(data['detail'] as ICommunicationData);
        });
    }

    notifyDrawingData(emitData: IDrawingData): void {
        this.raise('DrawingDataUpdate', JSON.stringify(emitData));
    }

    notifyAppData(emitData: IAppConfig): void {
        this.raise('AppDataUpdate', JSON.stringify(emitData));
    }

    notifyButtonClick(buttonName: string): void {
        this.raise('ButtonClick', buttonName);
    }

    private raise(eventName: string, eventData: any): void {
        if (this.boundObject) {
            this.boundObject.raiseEvent(eventName, { detail: eventData });
        }
        else {
            console.log("No 'idstObj' on WINDOW");
        }
    }

    private processDotNetInstruction(cData: ICommunicationData): void {
        switch(cData.command) {
            case 'get':
                switch(cData.data) {
                    case 'DrawingData':
                        this.notifyDrawingData(this.drawingdataservice.getDrawingData());
                        break;
                    case 'ApplicationData':
                        this.notifyAppData(this.appConfigService.getAppData());
                        break;
                }
                break;
            case 'set':
                break;
            case 'exec':
                break;
        }
    }
}

