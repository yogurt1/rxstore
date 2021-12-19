import 'reflect-metadata';
import { provideTrackerImpl } from './global';
import { RxTracker } from './rx-tracker';

// high-level api
export { Track } from './core/track-decorator';
export * from './core/make-state-observable';
export * from './api';

// rx impl's
export { RxTracker } from './rx-tracker';
export { RxStore } from './rx-store';

export * from './core/store';
export * from './core/tracker';
export * from './core/tracker-constructor';
export * from './core/abstract-store';
export * from './core/abstract-tracker';

provideTrackerImpl(RxTracker);
