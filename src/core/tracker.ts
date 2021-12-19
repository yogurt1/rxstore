import { Destroyable } from './destroyable';
import { HasChanges } from './has-changes';

export interface TrackerApi {
  /**
   * Track property
   */
  track(propertyKey: PropertyKey): void;

  /**
   * Track all decorated properties
   */
  trackAll(): void;
}

export interface Tracker extends TrackerApi, HasChanges, Destroyable {}
