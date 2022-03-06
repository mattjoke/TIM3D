import {
  ZodObject,
  array,
  boolean,
  number,
  object,
  optional,
  string,
  instanceof as zedInstance
} from 'zod';

import { Color } from 'three';

/**
 * Helper object which consists of colors used in input Config.
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
const Colors = object({
  backgroundColor: optional(string().or(zedInstance(Color))),
  emissiveColor: optional(string().or(zedInstance(Color))),
  selectionColor: optional(string().or(zedInstance(Color)))
});

/**
 * Input template for Config 
 * @author Matej Hakoš
 *
 * @type {ZodObject}
 */
const configSchema = object({
  colors: optional(Colors),
  world: optional(
    object({
      startPosition: optional(array(number()).length(3)),
      centerOfWorld: optional(array(number()).length(3)),
      globalRotation: optional(array(number()).length(4))
    })
  ),
  container: optional(zedInstance(HTMLElement)),
  loadingOverlay: optional(zedInstance(HTMLElement)),
  sidebar: optional(
    object({
      body: optional(zedInstance(HTMLElement)),
      visible: optional(boolean())
    })
  ),
  animationLoop: optional(array(string())),
  extensions: optional(object({}))
}).strict();

export { configSchema };
