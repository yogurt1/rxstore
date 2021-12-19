import { Observable } from 'rxjs';
import { Destroyable } from './destroyable';
import { HasChanges } from './has-changes';

export interface StoreApi<T> {
  readonly state$: Observable<T>;
}

export interface Store extends HasChanges, Destroyable, StoreApi<any> {
  readonly state$: Observable<this>;
}
