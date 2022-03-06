import { SafeParseReturnType } from 'zod';
import { configSchema } from './InputCheckConfig';
import { jsonSchema } from './InputCheckJson';

/**
 * Checks if input obejct is correct according to the template.
 * @author Matej Hakoš
 *
 * @param {object} object
 * @return {SafeParseReturnType}
 */
const ConfigCheck = (object: object) => {
  return configSchema.safeParse(object);
};

/**
 * Checks if input obejct is correct according to the template.
 * @author Matej Hakoš
 *
 * @param {object} object
 * @return {SafeParseReturnType}
 */
const JsonCheck = (object: object) => {
  return jsonSchema.safeParse(object);
};

export { ConfigCheck, JsonCheck };
