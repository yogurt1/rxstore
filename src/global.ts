import { Tracker } from './core/tracker';
import { TrackerConstructor } from './core/tracker-constructor';

const TRACKER_INSTANCE_KEY = Symbol('tracker-instance');

let defaultTrackerImpl: TrackerConstructor;

export function provideTrackerImpl(trackerImpl: TrackerConstructor): void {
  defaultTrackerImpl = trackerImpl;
}

export function ensureTrackerImpl(
  trackerImpl?: TrackerConstructor
): TrackerConstructor {
  trackerImpl = trackerImpl ?? defaultTrackerImpl;

  if (!trackerImpl) {
    throw new Error('no tracker impl provided');
  }

  return trackerImpl;
}

export function getTracker(target: object): Tracker | null {
  return Reflect.get(target, TRACKER_INSTANCE_KEY) ?? null;
}

export function initTracker(
  target: object,
  trackerImpl?: TrackerConstructor
): Tracker {
  let inst = getTracker(target);

  if (inst === null) {
    const ctor = ensureTrackerImpl(trackerImpl);
    inst = Reflect.construct(ctor, [target]);

    Reflect.set(target, TRACKER_INSTANCE_KEY, inst);
  }

  return inst!;
}
