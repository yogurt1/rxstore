import 'reflect-metadata';
import invariant from 'tiny-invariant';
import { AbstractTracker } from './core/abstract-tracker';

export class RxTracker extends AbstractTracker {
  protected decorate(
    key: PropertyKey,
    { get, set, value: originalValue }: PropertyDescriptor
  ): void {
    const tracker = this;

    if (get || set) {
      invariant(set, 'can only track setters');

      // TODO: optimize
      Reflect.defineProperty(this.target, key, {
        get,
        set(newValue) {
          Reflect.apply(set, this, [newValue]);
          tracker.notify();
        },
      });

      return;
    } else {
      let value = originalValue;

      Reflect.defineProperty(this.target, key, {
        get() {
          return value;
        },
        set(newValue) {
          value = newValue;
          tracker.notify();
        },
      });
    }
  }
}
