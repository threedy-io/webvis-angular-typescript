import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebvisLibService } from 'webvis-angular-lib';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {

  constructor(private webvisLibService: WebvisLibService) {
    // attach the webvis to the browser
    this.webvisLibService.initFromURL(environment.webvisURL as string);
  }

  ngOnInit() {}

  async ngAfterViewInit(): Promise<void> {
    // The model urn
    const urn = 'urn:x-i3d:shape:box';

    // Add the model to the scene and make it visible
    // by calling the addNodeFromUrl from the library webvis-angular-lib
    await this.webvisLibService
      .addNodeFromUrl(urn)
      .catch((err) => {
        console.warn(err);
        return undefined;
      });
  }
}
