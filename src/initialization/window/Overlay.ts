import { Sidebar } from "../../types/configTypes";
import { Tween } from "@tweenjs/tween.js";
import Stepper from "../Stepper";
import Window from "../Window";

const toggleFullscreen = (container: HTMLElement, sidebar?: HTMLElement) => {
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            obj.width = 15;
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
        opacity: 0,
    };

    if (!document.fullscreenElement) {
        if (sidebar != null) {
            new Tween(obj)
                .to({ opacity: 100 })
                .onUpdate(() => {
                    sidebar.style.opacity = `${obj.opacity}%`;
                })
                .start();
            new Tween(obj)
                .to({ width: 15 })
                .onUpdate(() => {
                    sidebar.style.width = `${obj.width}%`;
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

const Overlay = (stepper: Stepper, window: Window, customSidebar: Sidebar) => {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.pointerEvents = "none";
    overlay.style.top = "0";
    overlay.style.width = "inherit";
    overlay.style.height = "inherit";
    overlay.className = "noselect";

    // Slider
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = (stepper.length - 1).toString();
    slider.value = `${stepper.getCurrentStep()}`;
    slider.step = "1";
    slider.style.pointerEvents = "auto";
    slider.style.flexGrow = "4";

    const counter = document.createElement("span");
    counter.textContent = `${stepper.getCurrentStep()}/${stepper.length - 1}`;
    counter.style.color = "black";

    overlay.addEventListener("update", (ev: CustomEventInit) => {
        slider.value = ev.detail;
        counter.textContent = `${stepper.getCurrentStep()}/${
            stepper.length - 1
        }`;
    });

    slider.addEventListener("change", (ev: Event) => {
        ev.preventDefault();
        step(Number(slider.value));
    });

    function step(stepNum: number) {
        stepper.setStep(stepNum);
        slider.value = stepper.getCurrentStep().toString();
        counter.textContent = `${stepper.getCurrentStep()}/${
            stepper.length - 1
        }`;
    }
    // Buttons moves current step
    const buttonLeft = document.createElement("button");
    buttonLeft.innerHTML = "<";
    buttonLeft.style.pointerEvents = "auto";
    buttonLeft.addEventListener("click", (e: Event) => {
        e.preventDefault();
        step(stepper.getCurrentStep() - 1);
    });
    const buttonRight = document.createElement("button");
    buttonRight.innerHTML = ">";
    buttonRight.style.pointerEvents = "auto";
    buttonRight.addEventListener("click", (e: Event) => {
        e.preventDefault();
        step(stepper.getCurrentStep() + 1);
    });

    // Start
    const start = document.createElement("button");
    start.innerHTML = "⏮";
    start.style.pointerEvents = "auto";
    start.addEventListener("click", (e: Event) => {
        stepper.setStep(0);
        slider.value = `${stepper.getCurrentStep()}`;
    });

    // End
    const end = document.createElement("button");
    end.innerHTML = "⏭";
    end.style.pointerEvents = "auto";
    end.addEventListener("click", (e: Event) => {
        stepper.setStep(99999);
        slider.value = `${stepper.getCurrentStep()}`;
    });

    const upContainer = document.createElement("div");
    upContainer.style.display = "flex";
    upContainer.style.width = "100%";
    upContainer.style.flexDirection = "row";
    upContainer.style.justifyContent = "space-evenly";
    upContainer.style.flexWrap = "no-wrap";
    upContainer.style.overflow = "hidden";

    upContainer.appendChild(start);
    upContainer.appendChild(buttonLeft);
    upContainer.appendChild(slider);
    upContainer.appendChild(buttonRight);
    upContainer.appendChild(end);

    const sidebar = document.createElement("div");
    sidebar.style.display = "flex";
    sidebar.style.width = "0";
    sidebar.style.backgroundColor = "green";
    sidebar.style.pointerEvents = "none";
    sidebar.style.opacity = "0%";
    customSidebar.sidebarElem
        ? sidebar.appendChild(customSidebar.sidebarElem)
        : sidebar.appendChild(showcaseSidebar());

    // Sets div to fullscreen
    const fullscreen = document.createElement("button");
    fullscreen.innerHTML = "🗖";
    fullscreen.style.pointerEvents = "auto";
    fullscreen.addEventListener("click", (e: Event) => {
        toggleFullscreen(
            window.getContainer(),
            customSidebar.show ? sidebar : undefined
        );
    });

    // Resets camera to basic position
    const reset = document.createElement("button");
    reset.innerHTML = "🔃";
    reset.style.pointerEvents = "auto";
    reset.addEventListener("click", (e: Event) => {
        window.resetCamera();
    });

    const bottomContainer = document.createElement("div");
    bottomContainer.style.display = "flex";
    bottomContainer.style.width = "100%";
    bottomContainer.style.flexDirection = "row";
    bottomContainer.style.justifyContent = "space-between";
    bottomContainer.style.flexWrap = "no-wrap";
    bottomContainer.style.overflow = "hidden";

    bottomContainer.appendChild(reset);
    bottomContainer.appendChild(counter);
    bottomContainer.appendChild(fullscreen);

    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "space-between";

    container.appendChild(upContainer);
    container.appendChild(bottomContainer);

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    overlay.style.pointerEvents = "none";
    wrapper.style.flexDirection = "row";

    wrapper.appendChild(sidebar);
    wrapper.appendChild(container);

    overlay.appendChild(wrapper);
    console.log("Overlay instantiated");
    return overlay;
};

function showcaseSidebar(): HTMLElement {
    const div = document.createElement("div");
    div.style.backgroundColor = "beige";

    const h1 = document.createElement("h1");
    h1.textContent = "This is sidebar!";

    const p = document.createElement("p");
    p.textContent =
        "This is example side bar, you can turn it off  or change its appearance in configuration object.";

    div.appendChild(h1);
    div.appendChild(p);
    return div;
}

export default Overlay;