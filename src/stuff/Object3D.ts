import {
  BackSide,
  BufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Quaternion,
  Vector3
} from 'three';
import {
  generateRandomSeededColor,
  isColor
} from './Utils';

import { File } from '../types/jsonTypes';

/**
 * Description placeholder
 * @date 3/4/2022 - 12:28:44 PM
 * @author Matej Hakoš
 *
 * @class Object3D
 * @typedef {Object3D}
 */
class Object3D {
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {File}
   */
  private file: File;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {BufferGeometry}
   */
  private geometry: BufferGeometry;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Mesh}
   */
  private mesh: Mesh;
  /**
   * Description placeholder
   * @author Matej Hakoš
   *
   * @private
   * @type {Mesh}
   */
  private outline: Mesh;

  /**
   * Creates an instance of Object3D.
   * @date 3/4/2022 - 12:28:47 PM
   *
   * @constructor
   * @param {BufferGeometry} geometry
   * @param {File} file
   */
  constructor(geometry: BufferGeometry, file: File) {
    this.geometry = geometry;
    this.file = file;
    this.mesh = this.buildMesh(this.geometry, file);
    this.outline = this.buildOutline(this.geometry);
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:28:50 PM
   *
   * @public
   * @return {*}
   */
  public getMesh() {
    return this.mesh;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:01 PM
   *
   * @public
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  public setScale(x: number, y: number, z: number) {
    this.mesh.scale.set(x, y, z);
    this.outline.scale.set(x, y, z);
    this.outline.scale.multiplyScalar(1.07);
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:06 PM
   *
   * @public
   */
  public updateMatrix() {
    this.getMesh().updateMatrix();
    this.getOutline().updateMatrix();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:11 PM
   *
   * @public
   * @param {Vector3} position
   */
  public setPosition(position: Vector3) {
    this.getMesh().position.set(position.x, position.y, position.z);
    this.setOutlineFromMesh();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:20 PM
   *
   * @public
   * @param {Quaternion} rotation
   */
  public setRotation(rotation: Quaternion) {
    this.getMesh().setRotationFromQuaternion(rotation);
    this.getOutline().setRotationFromQuaternion(rotation);
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:26 PM
   *
   * @public
   * @param {(Vector3 | [number, number, number])} position
   */
  public addPosition(position: Vector3 | [number, number, number]) {
    if (position instanceof Vector3) {
      this.getMesh().position.add(position);
    } else {
      this.getMesh().position.add(
        new Vector3(position[0], position[1], position[2])
      );
    }
    this.setOutlineFromMesh();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:37 PM
   *
   * @public
   * @param {Quaternion} rotation
   */
  public addRotation(rotation: Quaternion) {
    this.setOutlineFromMesh();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:43 PM
   *
   * @public
   */
  public setOutlineFromMesh() {
    this.outline.position.copy(this.mesh.position);
    this.outline.rotation.copy(this.mesh.rotation);
    this.updateMatrix();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:29:50 PM
   *
   * @public
   */
  public setMeshFromOutline() {
    this.mesh.position.copy(this.outline.position);
    this.mesh.rotation.copy(this.outline.rotation);
    this.updateMatrix();
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:30:12 PM
   * @author Matej Hakoš
   *
   * @public
   * @return {*}
   */
  public getEmissive() {
    return this.mesh.material;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:37:17 PM
   *
   * @public
   * @return {*}
   */
  public getOutline() {
    return this.outline;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:37:36 PM
   * @author Matej Hakoš
   *
   * @public
   * @param {(string | Color | undefined)} selectionColor
   */
  public setOutlineColor(selectionColor: string | Color | undefined) {
    try {
      if (selectionColor == null) {
        return;
      }
      if (typeof selectionColor === 'string' && !isColor(selectionColor)) {
        throw new Error(`Cannot parse unknown color: ${selectionColor}`);
      }
      const material = this.getOutline().material as MeshStandardMaterial;
      material.color = new Color(selectionColor);
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:37:40 PM
   * @author Matej Hakoš
   *
   * @private
   * @param {BufferGeometry} geometry
   * @param {File} file
   * @return {*}
   */
  private buildMesh(geometry: BufferGeometry, file: File) {
    let objColor = file.color || 'random';
    if (objColor === 'random') {
      objColor = new Color(generateRandomSeededColor());
    }
    if (!isColor(objColor)) {
      console.warn(`${objColor} is not a valid color! Setting a random one.`);
      objColor = new Color(generateRandomSeededColor());
    }

    const material = new MeshStandardMaterial({
      name: `${file.id}-${file.name ?? 'defName'}`,
      color: objColor,
      opacity: 0.5,
      flatShading: false,
      clipShadows: false,
      metalness: 0
    });

    geometry.computeVertexNormals();

    const mesh = new Mesh(geometry, material);
    const pose = file.pose;

    // Custom default position
    const position = pose?.position || [0, 0, 0];
    mesh.position.add(new Vector3(position[0], position[1], position[2]));

    // Custom default orientation
    const orientation = pose?.orientation || [0, 0, 0, 0];
    mesh.quaternion.set(
      orientation[1],
      orientation[2],
      orientation[3],
      orientation[0]
    );
    mesh.quaternion.normalize();

    mesh.name = `${file.id}-${file.name ?? 'defName'}`;
    return mesh;
  }

  /**
   * Description placeholder
   * @date 3/4/2022 - 12:37:48 PM
   * @author Matej Hakoš
   *
   * @private
   * @param {BufferGeometry} geometry
   * @return {Mesh}
   */
  private buildOutline(geometry: BufferGeometry): Mesh {
    const outline = new MeshBasicMaterial({
      color: 'blue',
      side: BackSide
    });
    const shadow = new Mesh(geometry, outline);
    shadow.name = `${this.mesh.name}-outline`;
    shadow.position.set(
      this.mesh.position.x,
      this.mesh.position.y,
      this.mesh.position.z
    );
    shadow.rotation.set(
      this.mesh.rotation.x,
      this.mesh.rotation.y,
      this.mesh.rotation.z
    );
    shadow.scale.multiplyScalar(1.07);
    shadow.layers.set(1);
    return shadow;
  }
}

export { Object3D };
