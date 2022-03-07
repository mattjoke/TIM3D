import {
  Camera,
  Color,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer
} from 'three';
import { Easing, Tween } from '@tweenjs/tween.js';
import { containerSize, inputPosition } from '../../types/applicationTypes';

import { Colors } from '../../types/configTypes';

/**
 * Initializes and handles rendering.
 * @author Matej Hakoš
 *
 * @class Renderer
 * @typedef {Renderer}
 */
class Renderer {
  /**
   * Current WebGL rendering instance.
   *
   * @private
   * @type {WebGLRenderer}
   */
  private renderer: WebGLRenderer;
  /**
   * HTML element to which renderer render data.
   *
   * @public
   * @type {HTMLElement}
   */
  public domElement: HTMLElement;
  /**
   * Locks highlight rendering.
   *
   * @private
   * @type {boolean}
   */
  private locker = true;
  /**
   * Last highlighted Mesh.
   *
   * @private
   * @type {(Mesh | null)}
   */
  private lastHighlight: Mesh | null = null;
  /**
   * Custom highlight color.
   *
   * @private
   * @type {(Color | string | undefined)}
   */
  private customEmissive: Color | string | undefined;

  /**
   * Creates an instance of Renderer.
   *
   * @constructor
   * @param {containerSize} { width, height }
   * @param {Scene} scene
   * @param {Camera} camera
   * @param {?Colors} [colors]
   */
  constructor(
    { width, height }: containerSize,
    scene: Scene,
    camera: Camera,
    colors?: Colors
  ) {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);

    this.customEmissive = colors?.emissiveColor;

    this.domElement = this.renderer.domElement;
    this.initCallbacks(scene, camera);
  }

  /**
   * Initializes basic callbacks (touch events, double click...).
   *
   * @public
   * @param {Scene} scene
   * @param {Camera} camera
   */
  public initCallbacks(scene: Scene, camera: Camera) {
    this.renderer.domElement.addEventListener(
      'touchstart',
      (ev: TouchEvent) => {
        if (!this.locker) return;

        const touch = ev.touches[0];
        const pos = { clientX: touch.clientX, clientY: touch.clientY };
        this.selectObject(pos, scene, camera);
      }
    );

    this.renderer.domElement.addEventListener('dblclick', (ev: MouseEvent) => {
      if (!this.locker) return;

      const pos = { clientX: ev.clientX, clientY: ev.clientY };
      this.selectObject(pos, scene, camera);
    });

    this.renderer.domElement.addEventListener('mousemove', (ev: MouseEvent) => {
      if (!this.locker) return;

      const pos = { clientX: ev.clientX, clientY: ev.clientY };
      this.highlightObject(pos, scene, camera);
    });

    this.renderer.domElement.addEventListener('mouseenter', () => {
      this.unlockHightlight();
    });

    this.renderer.domElement.addEventListener('mouseleave', () => {
      this.lockHighlight();
    });
  }

  /**
   * Locks rendering and sets lastHighlight to normal color.
   *
   * @public
   */
  public lockHighlight() {
    const material = this.lastHighlight?.material as MeshStandardMaterial;
    material?.emissive.setHex(0x000000);
    this.lastHighlight = null;
    this.locker = false;
  }
  /**
   * Unlocks highlight.
   *
   * @public
   */
  public unlockHightlight() {
    this.locker = true;
  }

  /**
   * Destroys this instance.
   *
   * @public
   */
  public destroy() {
    this.renderer.clear();
    this.domElement.remove();
    this.locker = false;
    this.lastHighlight = null;
    this.customEmissive = undefined;
  }

  /**
   * Sets size of renderer and DOM element.
   *
   * @public
   * @param {containerSize} { width, height }
   */
  public setSize({ width, height }: containerSize) {
    this.renderer.setSize(width, height);
    this.domElement = this.renderer.domElement;
  }
  /**
   * Renders this scene with camera.
   *
   * @public
   * @param {Scene} scene
   * @param {PerspectiveCamera} camera
   */
  public render(scene: Scene, camera: PerspectiveCamera) {
    // this.renderer.autoClear = false;
    this.renderer.render(scene, camera);
    /* camera.layers.set(3);
        this.renderer.clearDepth();
        this.renderer.setScissorTest(true);
        this.renderer.setScissor(0,50,100,100);
        this.renderer.setViewport(0,50,100,100);
        this.renderer.render(scene, camera);
        this.renderer.setScissorTest(false);        
        camera.layers.set(0);*/
  }

  /**
   * Returns bounding box of DOM element.
   *
   * @public
   * @return {DOMRect}
   */
  public getBoundingRect() {
    return this.renderer.domElement.getBoundingClientRect();
  }

  /**
   * Computes raycast based on input postion, scene and camera.
   *
   * @private
   * @param {inputPosition} position
   * @param {Scene} scene
   * @param {Camera} camera
   * @return {Intersection[]}
   */
  private computeRaycast(
    position: inputPosition,
    scene: Scene,
    camera: Camera
  ) {
    const { bottom, right, left, top } = this.getBoundingRect();
    const raycaster = new Raycaster();
    const { clientX, clientY } = position;
    const mouse = new Vector2(
      ((clientX - left) / (right - left)) * 2 - 1,
      -((clientY - top) / (bottom - top)) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(scene.children, true);
  }

  /**
   * Handles "click" of the object.
   *
   * @private
   * @param {inputPosition} position
   * @param {Scene} scene
   * @param {Camera} camera
   */
  private selectObject(position: inputPosition, scene: Scene, camera: Camera) {
    const intersects = this.computeRaycast(position, scene, camera);
    for (let i = 0; i < intersects.length; i++) {
      const obj = intersects[i].object;
      if (obj.type !== 'Mesh' || obj.name.includes('-outline')) {
        continue;
      }
      const outline = scene.getObjectByName(`${obj.name}-outline`);
      if (!outline) break;
      outline.layers.toggle(0);
      obj.dispatchEvent({ type: 'click', data: obj });
    }
  }

  /**
   * Handles "hover" over the object.
   *
   * @private
   * @param {inputPosition} position
   * @param {Scene} scene
   * @param {Camera} camera
   */
  private highlightObject(
    position: inputPosition,
    scene: Scene,
    camera: Camera
  ) {
    const intersects = this.computeRaycast(position, scene, camera);

    if (this.lastHighlight != null && intersects.length == 0) {
      const material = this.lastHighlight.material as MeshStandardMaterial;
      const startHex = {
        hex: material.emissive.getHex()
      };
      new Tween(startHex)
        .to({ hex: 0x000000 }, 200)
        .easing(Easing.Linear.None)
        .onUpdate(() => {
          material.emissive.setHex(startHex.hex);
        })
        .start();
      this.lastHighlight = null;
    }

    for (let i = 0; i < intersects.length; i++) {
      const obj = intersects[i].object as Mesh;
      if (obj.type !== 'Mesh' || obj.name.includes('-outline')) {
        continue;
      }

      const material = obj.material as MeshStandardMaterial;
      if (this.lastHighlight == null) {
        this.lastHighlight = obj;
        material.emissive = new Color(this.customEmissive ?? 0x0000ff);
        obj.dispatchEvent({ type: 'hover', data: obj });
      }
    }
  }
}

export { Renderer };
