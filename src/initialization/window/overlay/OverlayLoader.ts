import { Sidebar } from '@manualTypes/configTypes';
import Stepper from 'initialization/Stepper';
import Icons from '../../../stuff/Icons';
import { checkFullscreen } from '../../../stuff/Utils';
import '../overlay/overlay.css';
import generateId from './generate-id.js';

const overlay = require('./overlay.hbs');

const showcaseSidebar = (): string => {
  const div = document.createElement('div');
  div.style.backgroundColor = 'beige';

  const h1 = document.createElement('h1');
  h1.textContent = 'This is sidebar!';

  const p = document.createElement('p');
  p.textContent =
    'This is example side bar, you can turn it off  or change its appearance in configuration object.';

  div.appendChild(h1);
  div.appendChild(p);
  return div.outerHTML;
};

const Loader = (stepper: Stepper, parentUUID: string, sidebar?: Sidebar) => {
  // Intantiate overlay with static info
  const template = overlay({
    uuid: parentUUID,
    counter: stepper.length != 0,
    stepper: {
      max: (stepper.length - 1).toString(),
      value: stepper.getCurrentStep()
    },
    sidebar: {
      body: sidebar?.body?.outerHTML ?? showcaseSidebar(),
      visible: sidebar?.visible ?? false
    },
    icons: Icons.getIcons()
  });

  const div = document.createElement('div');
  div.innerHTML = template;

  // Adds basic event listeners
  const slider = div.querySelector(
    `#${generateId('slider', parentUUID)}`
  ) as HTMLInputElement;
  const counter = div.querySelector(
    `#${generateId('counter', parentUUID)}`
  ) as HTMLSpanElement;

  const step = (stepNum: number) => {
    stepper.setStep(stepNum == -2 ? Number.POSITIVE_INFINITY : stepNum);
    if (counter != null) {
      counter.textContent = `${stepper.getCurrentStep()}/${stepper.length - 1}`;
    }
    if (slider != null) {
      slider.value = stepper.getCurrentStep().toString();
    }
  };

  slider?.addEventListener('change', (ev: Event) => {
    ev.preventDefault();
    step(Number(slider.value));
  });

  div
    .querySelector(`#${generateId('counter', parentUUID)}`)
    ?.addEventListener('update', ((ev: CustomEvent) => {
      ev.preventDefault();
      step(ev.detail);
    }) as EventListener);

  div
    .querySelector(`#${generateId('buttonLeft', parentUUID)}`)
    ?.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      step(stepper.getCurrentStep() - 1);
    });
  div
    .querySelector(`#${generateId('buttonRight', parentUUID)}`)
    ?.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      step(stepper.getCurrentStep() + 1);
    });

  div
    .querySelector(`#${generateId('buttonStart', parentUUID)}`)
    ?.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      step(0);
    });
  div
    .querySelector(`#${generateId('buttonEnd', parentUUID)}`)
    ?.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      step(-2);
    });

  document.addEventListener('fullscreenchange', (ev: Event) => {
    ev.preventDefault();
    const element = document.fullscreenElement;
    const btn = document?.querySelector(
      `#${generateId('buttonFullscreen', parentUUID)}`
    ) as HTMLButtonElement;

    if (element && checkFullscreen(document)) {
      btn.innerHTML = Icons.FullScreenToggle;
    } else {
      const btn = div?.querySelector(
        `#${generateId('buttonFullscreen', parentUUID)}`
      ) as HTMLButtonElement;
      btn.innerHTML = Icons.FullScreen;
    }
  });

  return div;
};

export { Loader as OverlayLoader };
