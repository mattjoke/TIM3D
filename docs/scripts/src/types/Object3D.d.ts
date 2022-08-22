import { BufferGeometry, Color, Mesh, Quaternion, Vector3 } from 'three';
import { File } from '../types/jsonTypes';
import { RuntimePose } from '../types/applicationTypes';
/**
 * Class that has all the relevant geometries/data/animations
 * for specific object.
 * @author Matej Hakoš
 *
 * @class Object3D
 * @typedef {Object3D}
 */
declare class Object3D {
    /**
     * Input file.
     *
     * @private
     * @type {File}
     */
    private file;
    /**
     * Name parsed from file.
     *
     * @public
     * @type {string}
     */
    fileID: string;
    /**
     * Last drawn pose
     *
     * @private
     * @type {RuntimePose}
     */
    private pose;
    /**
     * Computed Buffer Geometry.
     *
     * @private
     * @type {BufferGeometry}
     */
    private geometry;
    /**
     * Computed Mesh.
     *
     * @private
     * @type {Mesh}
     */
    private mesh;
    /**
     * Computed Mesh of outline (double-click).
     *
     * @private
     * @type {Mesh}
     */
    private outline;
    /**
     * Creates an instance of Object3D.
     *
     * @constructor
     * @param {BufferGeometry} geometry
     * @param {File} file
     */
    constructor(geometry: BufferGeometry, file: File);
    /**
     * Returns Mesh of the object.
     *
     * @public
     * @return {Mesh}
     */
    getMesh(): Mesh<BufferGeometry, import("three").Material | import("three").Material[]>;
    /**
     * Set scaling for object (and also outline).
     *
     * @public
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    setScale(x: number, y: number, z: number): void;
    /**
     * Updates matries for Mesh and Outline.
     *
     * @public
     */
    updateMatrix(): void;
    /**
     * Sets position of object to specific location.
     *
     * @public
     * @param {Vector3} position
     */
    setPosition(position: Vector3): void;
    /**
     * Sets rotation of object.
     *
     * @public
     * @param {Quaternion} rotation
     */
    setRotation(rotation: Quaternion): void;
    /**
     * Adds to the position of object.
     *
     * @public
     * @param {(Vector3 | [number, number, number])} position
     */
    addPosition(position: Vector3 | [number, number, number]): void;
    /**
     * Adds to the rotation of the object.
     *
     * @public
     * @param {Quaternion} rotation
     */
    addRotation(rotation: Quaternion): void;
    /**
     * Sets data (position & rotation) from outline to mesh.
     *
     * @public
     */
    setOutlineFromMesh(): void;
    /**
     * Sets data (position & rotation) from mesh to outline.
     *
     * @public
     */
    setMeshFromOutline(): void;
    /**
     * Returns material of emissive (highlight color)
     *
     * @public
     * @return {Material}
     */
    getEmissive(): import("three").Material | import("three").Material[];
    /**
     * Returns outline of the Mesh.
     *
     * @public
     * @return {Mesh}
     */
    getOutline(): Mesh<BufferGeometry, import("three").Material | import("three").Material[]>;
    /**
     * Returns last drawn pose.
     *
     * @public
     * @return {RuntimePose}
     */
    getPose(): RuntimePose;
    /**
     * Sets last drawn pose. <b>This does not update mesh!<b>
     *
     * @public
     * @param {RuntimePose} pose
     */
    setPose(pose: RuntimePose): void;
    /**
     * Returns a loaded file, that is used by this instance.
     *
     * @public
     * @return {File}
     */
    getFile(): File;
    /**
     * Sets outline color.
     *
     * @public
     * @param {(string | Color | undefined)} selectionColor
     */
    setOutlineColor(selectionColor: string | Color | undefined): void;
    /**
     * Builds Mesh based on geometry and file.
     *
     * @private
     * @param {BufferGeometry} geometry
     * @param {File} file
     * @return {Mesh}
     */
    private buildMesh;
    /**
     * Builds outline based on data from object.
     *
     * @private
     * @param {BufferGeometry} geometry
     * @return {Mesh}
     */
    private buildOutline;
}
export { Object3D };
