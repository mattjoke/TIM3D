import { Sidebar } from "@manualTypes/configTypes";
import Stepper from "initialization/Stepper";
import Icons from "../../../stuff/Icons";

import "../overlay/overlay.css";

const overlay = require("./overlay.hbs");

const showcaseSidebar = (): string => {
    const div = document.createElement("div");
    div.style.backgroundColor = "beige";

    const h1 = document.createElement("h1");
    h1.textContent = "This is sidebar!";

    const p = document.createElement("p");
    p.textContent =
        "This is example side bar, you can turn it off  or change its appearance in configuration object.";

    div.appendChild(h1);
    div.appendChild(p);
    return div.outerHTML;
};

const Loader = (stepper: Stepper, sidebar?: Sidebar) => {
    //Intantiate overlay with static info
    const template = overlay({
        counter: stepper.length != 0,
        stepper: {
            max: (stepper.length - 1).toString(),
            value: stepper.getCurrentStep(),
        },
        sidebar: {
            body: sidebar?.body?.outerHTML ?? showcaseSidebar(),
            visible: sidebar?.visible ?? false,
        },
        icons : Icons.getIcons()
    });
    const div = document.createElement("div");
    div.innerHTML = template;

    //Adds basic event listeners
    const slider = div.querySelector("#slider") as HTMLInputElement;
    const counter = div.querySelector("#counter") as HTMLSpanElement;

    const step = (stepNum: number) => {
        stepper.setStep(stepNum > -1 ? stepNum : Number.POSITIVE_INFINITY);
        if (counter != null) {
            counter.textContent = `${stepper.getCurrentStep()}/${
                stepper.length - 1
            }`;
        }
        if (slider != null) {
            slider.value = stepper.getCurrentStep().toString();
        }
    };

    slider?.addEventListener("change", (ev: Event) => {
        ev.preventDefault();
        step(Number(slider.value));
    });

    div.querySelector("#buttonLeft")?.addEventListener("click", (ev: Event) => {
        ev.preventDefault();
        step(stepper.getCurrentStep() - 1);
    });
    div.querySelector("#buttonRight")?.addEventListener(
        "click",
        (ev: Event) => {
            ev.preventDefault();
            step(stepper.getCurrentStep() + 1);
        }
    );

    div.querySelector("#buttonStart")?.addEventListener(
        "click",
        (ev: Event) => {
            ev.preventDefault();
            step(0);
        }
    );
    div.querySelector("#buttonEnd")?.addEventListener("click", (ev: Event) => {
        ev.preventDefault();
        step(-1);
    });

    console.log(div);

    return div;
};

export { Loader as OverlayLoader };
