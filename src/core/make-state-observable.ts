import { Observable } from 'rxjs';
import { startWith, mapTo } from 'rxjs/operators';
import { Tracker } from './tracker';

export function makeStateObservable<T extends object>(
  target: T,
  tracker: Tracker
): Observable<T> {
  return tracker.change$.pipe(startWith(target), mapTo(target));
}
