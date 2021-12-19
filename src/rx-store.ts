import { AbstractStore } from './core/abstract-store';
import { RxTracker } from './rx-tracker';

export class RxStore extends AbstractStore {
  constructor() {
    super(RxTracker);
  }
}
