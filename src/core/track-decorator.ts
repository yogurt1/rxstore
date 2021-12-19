import { TRACKED_PROPERTY_METADATA_KEY } from './util';

export function Track(): PropertyDecorator {
  return Reflect.metadata(TRACKED_PROPERTY_METADATA_KEY, true);
}
