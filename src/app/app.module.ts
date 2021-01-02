import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { Main } from "../app/components/main/main.component";
import { Toolbar } from "../app/components/toolbar/toolbar.component";
import { Diagram } from "../app/components/diagram/diagram.component";

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent, Main, Toolbar, Diagram
  ],
  imports: [
    BrowserModule, NgxGraphModule, BrowserAnimationsModule,
    MatMenuModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
