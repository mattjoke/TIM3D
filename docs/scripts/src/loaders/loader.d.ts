import { Config } from '../types/configTypes';
import { File } from '../types/jsonTypes';
import { Objects3D } from '../types/applicationTypes';
import { Window } from '../initialization/Window';
/**
 * Asynchronously loads files and prepares them and adds them to scene.
 * @author Matej Hakoš
 *
 * @async
 * @param {File[]} files
 * @param {Window} window
 * @param {?Config} [config]
 * @return {Promise<Objects3D>}
 */
declare const loader: (files: File[], window: Window, config?: Config | undefined) => Promise<Objects3D>;
export { loader };
