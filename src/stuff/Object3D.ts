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
 * Class that has all the relevant geometries/data/animations
 * for specific object.
 * @author Matej Hakoš
 *
 * @class Object3D
 * @typedef {Object3D}
 */
class Object3D {
  /**
   * Input file.
   *
   * @private
   * @type {File}
   */
  private file: File;
  /**
   * Computed Buffer Geometry.
   *
   * @private
   * @type {BufferGeometry}
   */
  private geometry: BufferGeometry;
  /**
   * Computed Mesh.
   *
   * @private
   * @type {Mesh}
   */
  private mesh: Mesh;
  /**
   * Computed Mesh of outline (double-click).
   *
   * @private
   * @type {Mesh}
   */
  private outline: Mesh;

  /**
   * Creates an instance of Object3D.
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
   * Returns Mesh of the object.
   *
   * @public
   * @return {Mesh}
   */
  public getMesh() {
    return this.mesh;
  }

  /**
   * Set scaling for object (and also outline).
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
   * Updates matries for Mesh and Outline.
   *
   * @public
   */
  public updateMatrix() {
    this.getMesh().updateMatrix();
    this.getOutline().updateMatrix();
  }

  /**
   * Sets position of object to specific location. 
   *
   * @public
   * @param {Vector3} position
   */
  public setPosition(position: Vector3) {
    this.getMesh().position.set(position.x, position.y, position.z);
    this.setOutlineFromMesh();
  }

  /**
   * Sets rotation of object.
   *
   * @public
   * @param {Quaternion} rotation
   */
  public setRotation(rotation: Quaternion) {
    this.getMesh().setRotationFromQuaternion(rotation);
    this.getOutline().setRotationFromQuaternion(rotation);
  }

  /**
   * Adds to the position of object.
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
   * Adds to the rotation of the object.
   *
   * @public
   * @param {Quaternion} rotation
   */
  public addRotation(rotation: Quaternion) {
    this.mesh.rotation.setFromQuaternion(rotation);
    this.setOutlineFromMesh();
  }

  /**
   * Sets data (position & rotation) from outline to mesh.
   *
   * @public
   */
  public setOutlineFromMesh() {
    this.outline.position.copy(this.mesh.position);
    this.outline.rotation.copy(this.mesh.rotation);
    this.updateMatrix();
  }

  /**
   * Sets data (position & rotation) from mesh to outline.
   *
   * @public
   */
  public setMeshFromOutline() {
    this.mesh.position.copy(this.outline.position);
    this.mesh.rotation.copy(this.outline.rotation);
    this.updateMatrix();
  }

  /**
   * Returns material of emissive (highlight color)
   *
   * @public
   * @return {Material}
   */
  public getEmissive() {
    return this.mesh.material;
  }

  /**
   * Returns outline of the Mesh.
   *
   * @public
   * @return {Mesh}
   */
  public getOutline() {
    return this.outline;
  }

  /**
   * Sets outline color.
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
   * Builds Mesh based on geometry and file.
   *
   * @private
   * @param {BufferGeometry} geometry
   * @param {File} file
   * @return {Mesh}
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
   * Builds outline based on data from object.
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
