import { Observable } from 'rxjs';

export interface HasChanges {
  /**
   * Emits when any `this` state changed
   */
  readonly change$: Observable<void>;
}
