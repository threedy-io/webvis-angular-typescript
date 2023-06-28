import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';
import { WebvisLibService } from '../webvis-lib.service';

@Component({
  selector: 'lib-webvis-viewer',
  templateUrl: './webvis-viewer.component.html',
  styleUrls: ['./webvis-viewer.component.css'],
})
export class WebvisViewerComponent implements OnInit {
  @Input() ctxName: string = 'default_context';
  @ViewChild('webvisContainer') webvisContainer!: ElementRef<HTMLElement>;

  public webvisLoaded$: BehaviorSubject<boolean>;

  constructor(protected webvisLibService: WebvisLibService) {
    this.webvisLoaded$ = webvisLibService.webvisLoaded$;
  }

  ngOnInit(): void {
    firstValueFrom(this.webvisLoaded$.pipe(filter((val) => !!val))).then(() => {
      this.webvisContainer.nativeElement.innerHTML = `<webvis-viewer context="${this.ctxName}"></webvis-viewer>`;
    });
  }
}
