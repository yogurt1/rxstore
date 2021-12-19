import { Tracker } from './tracker';

export interface TrackerConstructor {
  new (target: object): Tracker;
}
