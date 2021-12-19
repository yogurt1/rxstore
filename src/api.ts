import { Observable, NEVER } from 'rxjs';
import { makeStateObservable } from './core/make-state-observable';
import { StoreApi } from './core/store';
import { TrackerConstructor } from './core/tracker-constructor';
import { getTracker, initTracker } from './global';

export function getChange$(target: object): Observable<void> {
  return getTracker(target)?.change$ ?? NEVER;
}

/**
 * Initialize tracker with all decorated props
 */
export function trackAll(
  target: object,
  trackerImpl?: TrackerConstructor
): void {
  initTracker(target, trackerImpl).trackAll();
}

export function track(
  target: object,
  propertyKey: PropertyKey,
  trackerImpl?: TrackerConstructor
): void {
  initTracker(target, trackerImpl).track(propertyKey);
}

export function destroy(target: object): void {
  getTracker(target)?.destroy();
}

// TODO: should return tracker?
/**
 * trackAll + store api
 */
export function store<T extends object>(
  target: T,
  trackerImpl?: TrackerConstructor
): StoreApi<T> {
  trackAll(target, trackerImpl);

  const state$ = makeStateObservable(target, getTracker(target)!);

  return {
    state$,
  };
}
