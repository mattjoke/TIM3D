import Stepper from "./Stepper";
import Window from "./Window";

const toggleFullscreen = (container: HTMLElement) => {
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch((err) => {
            alert(
                `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
        });
    } else {
        document.exitFullscreen();
    }
};

const Overlay = (stepper: Stepper, window: Window) => {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.pointerEvents = "none";
    overlay.style.top = "0";
    overlay.style.width = "inherit";
    overlay.style.height = "inherit";
    // Slider
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = (stepper.length - 1).toString();
    slider.value = "0";
    slider.step = "1";
    slider.style.pointerEvents = "auto";
    slider.style.flexGrow = "4";

    slider.addEventListener("change", (ev: Event) => {
        ev.preventDefault();
        stepper.setStep(Number(slider.value));
    });

    function step(inc: number) {
        if (inc > 0) {
            slider.stepUp();
            stepper.moveStepUp();
        } else {
            slider.stepDown();
            stepper.moveStepDown();
        }
    }
    // Buttons moves current step
    const buttonLeft = document.createElement("button");
    buttonLeft.innerHTML = "<";
    buttonLeft.style.pointerEvents = "auto";
    buttonLeft.addEventListener("click", (e: Event) => {
        e.preventDefault();
        step(-1);
    });
    const buttonRight = document.createElement("button");
    buttonRight.innerHTML = ">";
    buttonRight.style.pointerEvents = "auto";
    buttonRight.addEventListener("click", (e: Event) => {
        e.preventDefault();
        step(1);
    });

    // Start
    const start = document.createElement("button");
    start.innerHTML = "⏮";
    start.style.pointerEvents = "auto";
    start.addEventListener("click", (e: Event) => {
        slider.value = "0";
        stepper.setStep(0);
    });

    // End
    const end = document.createElement("button");
    end.innerHTML = "⏭";
    end.style.pointerEvents = "auto";
    end.addEventListener("click", (e: Event) => {
        slider.value = `${stepper.length - 1}`;
        stepper.setStep(999);
    });

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.width = "100%";
    container.style.flexDirection = "row";
    container.style.justifyContent = "space-evenly";
    container.style.flexWrap = "no-wrap";
    container.style.overflow = "hidden";

    container.appendChild(start);
    container.appendChild(buttonLeft);
    container.appendChild(slider);
    container.appendChild(buttonRight);
    container.appendChild(end);

    overlay.appendChild(container);

    // Sets div to fullscreen
    const fullscreen = document.createElement("button");
    fullscreen.innerHTML = "🗖";
    fullscreen.style.position = "absolute";
    fullscreen.style.bottom = "0";
    fullscreen.style.right = "0";
    fullscreen.style.pointerEvents = "auto";
    fullscreen.addEventListener("click", (e: Event) => {
        toggleFullscreen(window.container);
    });

    overlay.appendChild(fullscreen);

    // Resets camera to basic position
    const reset = document.createElement("button");
    reset.innerHTML = "🔄";
    reset.style.position = "absolute";
    reset.style.bottom = "0";
    reset.style.left = "0";
    reset.style.pointerEvents = "auto";
    reset.addEventListener("click", (e: Event) => {
        window.resetCamera();
    });

    overlay.appendChild(reset);

    console.log("Overlay instantiated");
    return overlay;
};

export default Overlay;
