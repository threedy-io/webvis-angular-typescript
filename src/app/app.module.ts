import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebvisLibModule } from 'webvis-angular-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { MainViewComponent } from './main-view/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebvisLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
