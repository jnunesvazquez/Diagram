import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DesicionDiagramComponent } from './desicion-diagram/desicion-diagram.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SctX6NodeDecisionComponent } from './sct-x6-node-decision/sct-x6-node-decision.component';

@NgModule({
  declarations: [
    AppComponent,
    DesicionDiagramComponent,
    SctX6NodeDecisionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
