import {
  array,
  number,
  object,
  optional,
  string,
  instanceof as zedInstance
} from 'zod';

import { Color } from 'three';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @type {*}
 */
const objectID = string().or(number());

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @type {*}
 */
const fileSchema = object({
  id: string(),
  name: optional(objectID),
  file: string(),
  color: optional(string().or(zedInstance(Color))),
  pose: optional(
    object({
      position: optional(array(number()).length(3)),
      orientation: optional(array(number()).length(4))
    })
  ),
  animation: optional(string())
}).strict();

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @type {*}
 */
const positionSchema = object({
  id: string(),
  name: optional(objectID),
  pose: object({
    position: optional(array(number()).length(3)),
    orientation: optional(array(number()).length(4))
  }),
  animation: optional(string())
}).strict();
/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @type {*}
 */
const stepSchema = object({
  name: optional(string()),
  positions: array(positionSchema),
  animation: optional(string())
}).strict();

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @type {*}
 */
const jsonSchema = object({
  files: optional(array(fileSchema)),
  steps: optional(array(stepSchema))
}).strict();

export { jsonSchema, fileSchema, stepSchema, positionSchema };
