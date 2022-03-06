import { OverlayLoader } from './overlay/OverlayLoader';
import { Sidebar } from '../../types/configTypes';
import Stepper from '../Stepper';
import { Tween } from '@tweenjs/tween.js';
import Window from '../Window';
import generateId from './overlay/generate-id';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {HTMLElement} container
 * @param {?HTMLElement} [sidebar]
 */
const toggleFullscreen = (container: HTMLElement, sidebar?: HTMLElement) => {
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      obj.width = 30;
      obj.opacity = 100;
      if (sidebar != null) {
        new Tween(obj)
          .to({ width: 0, opacity: 0 })
          .onUpdate(() => {
            sidebar.style.width = `${obj.width}%`;
            sidebar.style.opacity = `${obj.opacity}%`;
          })
          .start();
      }
    }
  });

  const obj = {
    width: 0,
    opacity: 0
  };

  if (!document.fullscreenElement) {
    if (sidebar != null) {
      new Tween(obj)
        .to({ width: 15, opacity: 100 })
        .onUpdate(() => {
          sidebar.style.width = `${obj.width}%`;
          sidebar.style.opacity = `${obj.opacity}%`;
        })
        .start();
    }
    container.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    if (sidebar != null) {
      obj.width = 15;
      obj.opacity = 100;
      new Tween(obj)
        .to({ width: 0, opacity: 0 })
        .onUpdate(() => {
          sidebar.style.width = `${obj.width}%`;
          sidebar.style.opacity = `${obj.opacity}%`;
        })
        .start();
    }
    document.exitFullscreen();
  }
};

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @param {Stepper} stepper
 * @param {Window} window
 * @param {string} parentUUID
 * @param {?Sidebar} [customSidebar]
 * @return {*}
 */
const Overlay = (
  stepper: Stepper,
  window: Window,
  parentUUID: string,
  customSidebar?: Sidebar
) => {
  // Instantiate basic logic and listeners
  const template = OverlayLoader(stepper, parentUUID, customSidebar);
  template
    .querySelector(`#${generateId('buttonFullscreen', parentUUID)}`)
    ?.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      toggleFullscreen(
        window.getContainer(),
        customSidebar?.visible
          ? (template.querySelector(
              `#${generateId('sidebar', parentUUID)}`
            ) as HTMLElement)
          : undefined
      );
    });

  template
    .querySelector(`#${generateId('buttonReset', parentUUID)}`)
    ?.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      window.resetCamera();
    });

  stepper.signaler.addEventListener('update', ((ev: CustomEvent) => {
    template
      .querySelector(`#${generateId('counter', parentUUID)}`)
      ?.dispatchEvent(new CustomEvent('update', { detail: ev.detail }));
  }) as EventListener);

  return template;
};

export default Overlay;
