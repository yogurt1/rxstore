export const TRACKED_PROPERTY_METADATA_KEY = Symbol('tracked-property');

export function isValidTarget(target: unknown): target is object {
  return (
    typeof target === 'object' && target !== null && target !== Object.prototype
  );
}

export function isPropertyTracked(
  target: object,
  propertyKey: PropertyKey
): boolean {
  return (
    // @ts-expect-error
    Reflect.getMetadata(TRACKED_PROPERTY_METADATA_KEY, target, propertyKey) ===
    true
  );
}

export function getTrackedProperties(target: object): PropertyKey[] {
  // TODO: ensure works with prototype
  return Reflect.ownKeys(target).filter(propertyKey =>
    isPropertyTracked(target, propertyKey)
  );
}

export function getPropertyDescriptorDeep(
  target: object,
  propertyKey: PropertyKey
): PropertyDescriptor | null {
  const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey);

  if (descriptor) {
    return descriptor;
  }

  const proto = Reflect.getPrototypeOf(target);

  if (!isValidTarget(proto)) {
    return null;
  }

  return getPropertyDescriptorDeep(proto, propertyKey);
}
