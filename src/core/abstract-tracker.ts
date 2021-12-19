import { Subject } from 'rxjs';
import { Tracker } from './tracker';
import { getPropertyDescriptorDeep, getTrackedProperties } from './util';

export abstract class AbstractTracker implements Tracker {
  private readonly _notifier = new Subject<void>();
  private readonly _decoratedProperties = new Set<PropertyKey>();

  change$ = this._notifier.asObservable();

  constructor(protected readonly target: object) {}

  track(propertyKey: PropertyKey): void {
    const descriptor = getPropertyDescriptorDeep(this.target, propertyKey);

    if (descriptor) {
      this._decorateOnce(propertyKey, descriptor);
    }
  }

  trackAll(): void {
    getTrackedProperties(this.target).forEach(propertyKey => {
      this.track(propertyKey);
    });
  }

  destroy(): void {
    this._notifier.complete();
  }

  private _decorateOnce(
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): void {
    if (!this._decoratedProperties.has(propertyKey)) {
      this.decorate(propertyKey, descriptor);
      this._decoratedProperties.add(propertyKey);
    }
  }

  protected abstract decorate(
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): void;

  protected notify(): void {
    this._notifier.next();
  }
}
