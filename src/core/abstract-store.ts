import { Observable } from 'rxjs';
import { Destroyable } from './destroyable';
import { makeStateObservable } from './make-state-observable';
import { Store } from './store';
import { Tracker } from './tracker';
import { TrackerConstructor } from './tracker-constructor';

export class AbstractStore implements Store, Destroyable {
  private readonly tracker: Tracker;

  change$: Observable<void>;
  state$: Observable<this>;

  constructor(trackerConstructor: TrackerConstructor) {
    this.tracker = Reflect.construct(trackerConstructor, [this]);
    this.change$ = this.tracker.change$;
    this.state$ = makeStateObservable(this, this.tracker);
  }

  protected track(propertyKey: PropertyKey): void {
    this.tracker.track(propertyKey);
  }

  protected trackAll(): void {
    this.tracker.trackAll();
  }

  destroy(): void {
    this.tracker.destroy();
  }
}
