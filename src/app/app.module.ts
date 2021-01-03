import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { Main } from "../app/components/main/main.component";
import { Toolbar } from "../app/components/toolbar/toolbar.component";
import { Diagram } from "../app/components/diagram/diagram.component";
import { BlockPropsDialog } from '../app/components/modals/blockprops';
import { LinkPropsDialog } from '../app/components/modals/linkprops';

import { OverlayModule } from '@angular/cdk/overlay';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent, Main, Toolbar, Diagram, BlockPropsDialog, LinkPropsDialog
  ],
  imports: [
    BrowserModule, NgxGraphModule, BrowserAnimationsModule, OverlayModule,
    MatMenuModule, MatButtonModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatDialogModule

  ],
  providers: [],
  entryComponents: [
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
