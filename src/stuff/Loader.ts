import { Group, Mesh, Quaternion, Vector3 } from 'three';

import { Config } from '../types/configTypes';
import { File } from '../types/jsonTypes';
import { LoaderManager } from './loaders/LoaderManager';
import { LoaderOverlay } from './loaders/LoaderOverlay';
import { Object3D } from './Object3D';
import { Objects3D } from '../types/applicationTypes';
import { Window } from '../initialization/Window';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @async
 * @param {File[]} files
 * @param {Window} window
 * @param {?Config} [config]
 * @return {Promise<Objects3D>}
 */
const Loader = async (
  files: File[],
  window: Window,
  config?: Config
): Promise<Objects3D> => {
  const div = config?.loadingOverlay ?? LoaderOverlay();
  div.style.zIndex = '100';
  window.container.appendChild(div);

  const items: Objects3D = new Map();

  const manager = LoaderManager();

  for (const file of files) {
    const loader = manager.getHandler(file.file);

    await loader
      ?.loadAsync(file.file)
      .then(async (object) => {
        let obj: Object3D;
        switch (object.type) {
          case 'Group':
            const o = object as Group;
            const child = o.children[0] as Mesh;
            obj = new Object3D(child.geometry, file);
            obj.setScale(50, 50, 50);
            break;
          default:
            obj = new Object3D(object, file);
            break;
        }

        obj.setOutlineColor(config?.colors?.selectionColor);

        if (items.get(file.id)) {
          throw new Error(
            `Duplicate object name: ${file.id}, please check your files array.`
          );
        }

        items.set(file.id, obj);
        window.getScene().addObject(obj.getMesh());
        window.getScene().addObject(obj.getOutline());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  if (config?.world?.globalRotation != null) {
    const rotation = new Quaternion();
    rotation.set(
      config?.world?.globalRotation?.[0],
      config?.world?.globalRotation?.[1],
      config?.world?.globalRotation?.[2],
      config?.world?.globalRotation?.[3]
    );
    window.getScene().getInstance().setRotationFromQuaternion(rotation);
  } else {
    window
      .getScene()
      .getInstance()
      .rotateOnWorldAxis(new Vector3(1, 0, 0), -Math.PI / 2);
  }

  window.container.removeChild(div);

  return items;
};

export { Loader };
