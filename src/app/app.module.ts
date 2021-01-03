import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { Main } from "../app/components/main/main.component";
import { Toolbar } from "../app/components/toolbar/toolbar.component";
import { Diagram } from "../app/components/diagram/diagram.component";
import { BlockPropsEndpointDialog } from './components/modals/blockprops-endpoint';
import { BlockPropsInputDialog } from './components/modals/blockprops-input';
import { BlockPropsOutputDialog } from './components/modals/blockprops-output';
import { LinkPropsDialog } from '../app/components/modals/linkprops';

import { OverlayModule } from '@angular/cdk/overlay';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

import { DialogService } from './services/dialogservice';
import { BlockDialogService } from './services/blockdialogservice';
import { DrawingDataService } from './services/drawingdataservice';

@NgModule({
  declarations: [
    AppComponent, Main, Toolbar, Diagram,
    BlockPropsEndpointDialog, BlockPropsInputDialog, BlockPropsOutputDialog,
    LinkPropsDialog
  ],
  imports: [
    BrowserModule, NgxGraphModule, BrowserAnimationsModule, OverlayModule,
    MatMenuModule, MatButtonModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatDialogModule, MatTabsModule, MatListModule
  ],
  providers: [
    DialogService,
    BlockDialogService,
    DrawingDataService
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
