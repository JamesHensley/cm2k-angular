import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Main } from "../app/components/main/main.component";
import { Toolbar } from "../app/components/toolbar/toolbar.component";
import { Diagram } from "../app/components/diagram/diagram.component";
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent, Main, Toolbar, Diagram
  ],
  imports: [
    BrowserModule, NgxGraphModule, BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
