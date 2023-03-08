import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { WebvisViewerComponent } from './webvis-viewer/webvis-viewer.component';
import { CommonModule } from '@angular/common';
import { WebvisProgressComponent } from './webvis-progress/webvis-progress.component';

@NgModule({
  declarations: [
    WebvisViewerComponent,
    WebvisProgressComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WebvisViewerComponent,
    WebvisProgressComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WebvisLibModule { }
