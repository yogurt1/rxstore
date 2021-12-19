import 'reflect-metadata';
import invariant from 'tiny-invariant';
import { AbstractTracker } from './core/abstract-tracker';

export class RxTracker extends AbstractTracker {
  protected decorate(
    key: PropertyKey,
    { get, set, value: originalValue }: PropertyDescriptor
  ): void {
    if (get || set) {
      invariant(set, 'can only track setters');

      // TODO: optimize
      Reflect.defineProperty(this.target, key, {
        get: () => {
          if (typeof get === 'function') {
            return Reflect.apply(get, this.target, []);
          }
        },
        set: newValue => {
          Reflect.apply(set, this.target, [newValue]);
          this.notify();
        },
      });

      return;
    } else {
      let value = originalValue;

      Reflect.defineProperty(this.target, key, {
        get: () => value,
        set: newValue => {
          value = newValue;
          this.notify();
        },
      });
    }
  }
}
