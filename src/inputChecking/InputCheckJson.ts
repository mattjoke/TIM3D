import {
  ZodObject,
  array,
  number,
  object,
  optional,
  string,
  instanceof as zedInstance
} from 'zod';

import { Color } from 'three';

/**
 * Template for obejctID
 * @author Matej Hakoš
 *
 * @type {ZosString}
 */
const objectID = string().or(number());

/**
 * Strictly checks if input Files are corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
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
 * Strictly checks if input Positions are corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
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
 * Strictly checks if input Steps are corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
const stepSchema = object({
  name: optional(string()),
  positions: array(positionSchema),
  animation: optional(string())
}).strict();

/**
 * Strictly checks if input JSON is corresponding with template.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
const jsonSchema = object({
  files: optional(array(fileSchema)),
  steps: optional(array(stepSchema))
}).strict();

export { jsonSchema, fileSchema, stepSchema, positionSchema };
