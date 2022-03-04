import { configSchema } from './InputCheckConfig';
import { jsonSchema } from './InputCheckJson';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {object} object
 * @return {*}
 */
const ConfigCheck = (object: object) => {
  return configSchema.safeParse(object);
};

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {object} object
 * @return {*}
 */
const JsonCheck = (object: object) => {
  return jsonSchema.safeParse(object);
};

export { ConfigCheck, JsonCheck };
