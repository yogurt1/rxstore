import { Observable } from 'rxjs';
import { store, StoreApi, Track } from '../src';

class CounterStore implements StoreApi<CounterStore> {
  @Track()
  protected _count: number;

  readonly state$: Observable<CounterStore>;

  constructor(initialCount = 0) {
    this._count = initialCount;
    this.state$ = store(this).state$;
  }

  get doubledCount(): number {
    return this._count * 2;
  }

  increment(): void {
    this._count += 1;
  }
}

describe('RxStore', () => {
  it('works', () => {
    expect.assertions(3);

    const subscriber = jest.fn();

    const counterStore = new CounterStore();

    counterStore.state$.subscribe(subscriber);

    counterStore.increment();

    expect(subscriber).toHaveBeenCalledTimes(2);
    expect(subscriber).toHaveBeenNthCalledWith(1, counterStore);
    expect(subscriber).toHaveBeenNthCalledWith(2, counterStore);
  });
});
