import { GridHelper } from "three";
import Init from "../Init";
import Stepper from "./Stepper";

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        Init.window.container.requestFullscreen().catch((err) => {
            alert(
                `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
        });
    } else {
        document.exitFullscreen();
    }
};

const Overlay = (maximum: number) => {
    let overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.pointerEvents = "none";
    overlay.style.top = "0";
    overlay.style.width = "inherit";
    overlay.style.height = "inherit";
    //Slider
    let slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = (maximum - 1).toString();
    slider.value = "0";
    slider.step = "1";
    slider.style.width = "90%";
    slider.style.pointerEvents = "auto";

    slider.addEventListener("change", (ev) => {
        Stepper.setStep(Number(slider.value));
    });

    function step(inc: number) {
        if (inc > 0) {
            slider.stepUp();
            Stepper.moveStepUp();
        } else {
            slider.stepDown();
            Stepper.moveStepDown();
        }
    }
    //Buttons
    let buttonLeft = document.createElement("button");
    buttonLeft.innerHTML = "<";
    buttonLeft.style.pointerEvents = "auto";
    buttonLeft.addEventListener("click", (e: Event) => {
        step(-1);
    });
    let buttonRight = document.createElement("button");
    buttonRight.innerHTML = ">";
    buttonRight.style.pointerEvents = "auto";
    buttonRight.addEventListener("click", (e: Event) => {
        step(1);
    });

    overlay.appendChild(buttonLeft);
    overlay.appendChild(slider);
    overlay.appendChild(buttonRight);

    let fullscreen = document.createElement("button");
    fullscreen.innerHTML = "🗖";
    fullscreen.style.position = "absolute";
    fullscreen.style.bottom = "0";
    fullscreen.style.right = "0";
    fullscreen.style.pointerEvents = "auto";
    fullscreen.addEventListener("click", (e: Event) => {
        toggleFullscreen();
    });

    overlay.appendChild(fullscreen);

    let reset = document.createElement("button");
    reset.innerHTML = "🔄";
    reset.style.position = "absolute";
    reset.style.bottom = "0";
    reset.style.left = "0";
    reset.style.pointerEvents = "auto";
    reset.addEventListener("click", (e: Event) => {
        Init.window.resetCamera();
    });

    overlay.appendChild(reset);
    console.log("Overlay instantiated");
    return overlay;
};

export default Overlay;
