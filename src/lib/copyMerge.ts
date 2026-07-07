// Structural deep-merge of CMS-published marketing-copy overrides over the
// bundled default copy modules (src/content/copy/*). The merge is defensive:
// an override value is only applied when it matches the shape of the default
// it replaces, so malformed or partial CMS data can never break a page —
// anything that doesn't validate silently falls back to the bundled default.

type Scalar = string | number | boolean;

function isScalar(v: unknown): v is Scalar {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean";
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function mergeScalar(defaultValue: Scalar, override: unknown): Scalar {
  if (typeof override === typeof defaultValue) return override as Scalar;
  // Feature-comparison cells are boolean|string unions; allow crossing over.
  if (typeof defaultValue === "boolean" && typeof override === "string") return override;
  if (typeof defaultValue === "string" && typeof override === "boolean") return override;
  return defaultValue;
}

/** Every scalar/array key present in the template must exist in the item with a compatible type. */
function itemMatchesTemplate(item: unknown, template: unknown): boolean {
  if (isScalar(template)) {
    return isScalar(item);
  }
  if (Array.isArray(template)) {
    return Array.isArray(item);
  }
  if (isPlainObject(template)) {
    if (!isPlainObject(item)) return false;
    return Object.entries(template).every(([key, tplValue]) => {
      if (tplValue === undefined) return true;
      const value = (item as Record<string, unknown>)[key];
      if (value === undefined) return false;
      return itemMatchesTemplate(value, tplValue);
    });
  }
  return false;
}

function mergeArray(defaults: unknown[], override: unknown): unknown[] {
  if (!Array.isArray(override)) return defaults;
  const template = defaults[0];
  if (template === undefined) {
    // No template (empty bundled array, e.g. open positions): accept any
    // array of scalars/objects as-is.
    return override.every((item) => isScalar(item) || isPlainObject(item)) ? override : defaults;
  }
  if (!override.every((item) => itemMatchesTemplate(item, template))) return defaults;
  if (isScalar(template)) return override;
  // Array of objects: merge each item against the template so nested shapes
  // (e.g. bullets: string[]) are validated recursively; extra keys (badge,
  // note, …) pass through untouched.
  return override.map((item) => {
    const merged = mergeCopy(template, item) as Record<string, unknown>;
    return { ...(item as Record<string, unknown>), ...merged };
  });
}

/**
 * Merge a CMS override onto bundled defaults. Objects merge key-by-key
 * (unknown override keys are ignored), arrays are replaced wholesale after
 * per-item shape validation, scalars require a compatible type.
 */
export function mergeCopy<T>(defaults: T, override: unknown): T {
  if (override === undefined || override === null) return defaults;
  if (isScalar(defaults)) {
    return mergeScalar(defaults, override) as T;
  }
  if (Array.isArray(defaults)) {
    return mergeArray(defaults, override) as T;
  }
  if (isPlainObject(defaults)) {
    if (!isPlainObject(override)) return defaults;
    const result: Record<string, unknown> = { ...defaults };
    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (key in override) {
        result[key] = mergeCopy(defaultValue, override[key]);
      }
    }
    return result as T;
  }
  return defaults;
}
