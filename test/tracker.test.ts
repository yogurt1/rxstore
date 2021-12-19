import { getChange$, track, Track, trackAll } from '../src';

class WithProperty {
  test = 2;

  constructor() {
    track(this, 'test');
  }
}

class WithDecorator {
  @Track() test = 2;

  constructor() {
    trackAll(this);
  }
}

describe('track and trackAll', () => {
  it('track manually', () => {
    expect.assertions(1);

    const withProperty = new WithProperty();
    const subscriber = jest.fn();

    getChange$(withProperty).subscribe(subscriber);

    withProperty.test = 4;
    withProperty.test = 5;

    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it('track decorator', () => {
    expect.assertions(1);

    const withDecorator = new WithDecorator();
    const subscriber = jest.fn();

    getChange$(withDecorator).subscribe(subscriber);

    withDecorator.test = 4;
    withDecorator.test = 4;

    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
