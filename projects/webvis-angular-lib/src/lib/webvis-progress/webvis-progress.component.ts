import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { WebvisLibService } from '../webvis-lib.service';

@Component({
  selector: 'lib-webvis-progress',
  templateUrl: './webvis-progress.component.html',
  styleUrls: ['./webvis-progress.component.scss']
})
export class WebvisProgressComponent implements OnInit {

  @Input() ctxName?: string;

  public isProcessing$: Observable<boolean>;

  constructor(
    protected webvisLibService: WebvisLibService,
  ) {
    this.isProcessing$ = webvisLibService.getProcessingSubject(this.ctxName).pipe(debounceTime(50));
  } 

  ngOnInit(): void {
  }
}
