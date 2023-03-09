import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebvisLibService {
  public webvisLoaded$ = new BehaviorSubject(false);

  private selectionChangedSubjects = new Map<
    string | undefined,
    Subject<number>
  >();
  private isProcessingSubjects = new Map<
    string | undefined,
    BehaviorSubject<boolean>
  >();

  constructor(private ngZone: NgZone) {}

  public initFromURL(url: string): void {
    if (this.webvisLoaded$.value) return;

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => {
      this.webvisLoaded$.next(true);
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  public getSelectionChangeSubject(ctxName?: string) {
    let subject = this.selectionChangedSubjects.get(ctxName);
    if (!subject) {
      subject = new Subject();
      this.selectionChangedSubjects.set(ctxName, subject);
    }
    return subject;
  }

  public getProcessingSubject(ctxName?: string) {
    let subject = this.isProcessingSubjects.get(ctxName);
    if (!subject) {
      subject = new BehaviorSubject<boolean>(false);
      this.isProcessingSubjects.set(ctxName, subject);
    }
    return subject;
  }

  public registerListenersForContext(ctxName?: string) {
    this.getWebvisContext(ctxName).then((ctx) =>
      ctx.registerListener(
        [
          webvis.EventType.SELECTION_CHANGED,
          webvis.EventType.PROGRESS_CHANGED,
          webvis.EventType.VIEWER_CREATED,
        ],
        (event) => this.ngZone.run(() => this.handleWebvisEvent(event, ctxName))
      )
    );
  }

  async addNodeFromUrl(
    dataURI: string,
    ctxName?: string,
    enabled = true
  ): Promise<number> {
    const ctx = await this.getWebvisContext(ctxName);
    const node = ctx.add(dataURI);

    // Check NodeInfoState, then Enable, then resolve
    return ctx
      .getProperty(node, 'infoState')
      .then((state) => {
        if (state !== webvis.NodeInfoState.DEFAULT)
          throw new Error('Wrong NodeInfoState');
      })
      .then(() => ctx.setProperty(node, webvis.Property.ENABLED, enabled))
      .then(() => ctx.getProperty(node, webvis.Property.CHILDREN))
      .then(() => node)
      .catch(() => {
        ctx.remove(node);
        return Promise.reject('Could not add: ' + dataURI);
      });
  }

  async removeNodeById(id: number, ctxName?: string): Promise<void> {
    const ctx = await this.getWebvisContext(ctxName);
    return ctx.remove(id);
  }

  async getWebvisContext(ctxName?: string): Promise<webvis.ContextAPI> {
    return firstValueFrom(
      this.webvisLoaded$.pipe(
        filter((val) => !!val),
        map((_) => (<any>window).webvis.getContext(ctxName))
      )
    );
  }

  async createContext(ctxName?: string): Promise<webvis.ContextAPI> {
    return (<any>window).webvis.getContext(ctxName);
  }

  handleWebvisEvent(event: webvis.WebVisEvent, ctxName?: string) {
    switch (event.type) {
      case webvis.EventType.SELECTION_CHANGED:
        this.getSelectionChangeSubject(ctxName).next(
          (event as webvis.SelectionChangedEvent).targetNodeID
        );
        break;
      case webvis.EventType.PROGRESS_CHANGED:
        this.getProcessingSubject(ctxName).next(
          (event as webvis.ProgressChangedEvent).progressState
            .downloadProgress < 100
        );
        break;
      default:
        break;
    }
  }

  isWebvisLoaded() {
    return this.webvisLoaded$.value;
  }
}
