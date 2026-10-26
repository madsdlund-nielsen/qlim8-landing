// Structural deep-merge of CMS-published marketing-copy overrides over the
// bundled default copy modules (src/content/copy/*). The merge is defensive:
// an override value is only applied when it matches the shape of the default
// it replaces, so malformed or partial CMS data can never break a page, 
// anything that doesn't validate silently falls back to the bundled default.

type Scalar = string | number | boolean;

function isScalar(v: unknown): v is Scalar {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean";
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * A value is "well-formed" if it's built only from scalars, plain objects and
 * arrays (recursively): i.e. structurally sane JSON with no null/undefined
 * holes. Used to vet CMS-authored keys that the bundled default doesn't define
 * and therefore has no shape template to validate against.
 */
function isWellFormed(v: unknown): boolean {
  if (isScalar(v)) return true;
  if (Array.isArray(v)) return v.every(isWellFormed);
  if (isPlainObject(v)) return Object.values(v).every(isWellFormed);
  return false;
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

/**
 * Identity keys on array items. A bundled item may carry one (the home plans
 * carry the package `key`), but the /admin editor has no field for it, so an
 * override item without it is still a valid item: it is not held to the
 * template for this key and does not inherit the template's value (that would
 * make every plan "free"). The consumer falls back to something else, see
 * `curatedPlanFor`. Every other key stays required.
 */
const IDENTITY_KEYS = ["key"];

function withoutIdentityKeys(template: unknown): unknown {
  if (!isPlainObject(template)) return template;
  const rest = { ...template };
  for (const k of IDENTITY_KEYS) delete rest[k];
  return rest;
}

function mergeArray(defaults: unknown[], override: unknown): unknown[] {
  if (!Array.isArray(override)) return defaults;
  const template = withoutIdentityKeys(defaults[0]);
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
    const merged = mergeCopy(template, item, false) as Record<string, unknown>;
    return { ...(item as Record<string, unknown>), ...merged };
  });
}

/**
 * Merge a CMS override onto bundled defaults. Objects merge key-by-key, arrays
 * are replaced wholesale after per-item shape validation, scalars require a
 * compatible type.
 *
 * `allowNewKeys` (true only at the top level) lets a CMS-authored top-level
 * section that the bundled default omits: e.g. a `howItWorks` block added in
 * the CMS: surface, provided its value is well-formed. Nested unknown keys are
 * still ignored (they have no shape template and are more likely stale/junk),
 * preserving the defensive contract everywhere below the page root.
 */
export function mergeCopy<T>(defaults: T, override: unknown, allowNewKeys = true): T {
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
        result[key] = mergeCopy(defaultValue, override[key], false);
      }
    }
    if (allowNewKeys) {
      for (const [key, overrideValue] of Object.entries(override)) {
        if (!(key in defaults) && isWellFormed(overrideValue)) {
          result[key] = overrideValue;
        }
      }
    }
    return result as T;
  }
  return defaults;
}
