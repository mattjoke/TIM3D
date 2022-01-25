import { Tween } from "@tweenjs/tween.js";
import { Sidebar } from "../../types/configTypes";
import Stepper from "../Stepper";
import Window from "../Window";
import { OverlayLoader } from "./overlay/OverlayLoader";

const toggleFullscreen = (container: HTMLElement, sidebar?: HTMLElement) => {
    document.addEventListener("fullscreenchange", () => {
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
        opacity: 0,
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

const Overlay = (
    stepper: Stepper,
    window: Window,
    parentUUID: string,
    customSidebar?: Sidebar
) => {
    //Instantiate basic logic and listeners
    const template = OverlayLoader(stepper, parentUUID, customSidebar);
    template
        .querySelector(`#buttonFullscreen${parentUUID}`)
        ?.addEventListener("click", (ev: Event) => {
            ev.preventDefault();
            toggleFullscreen(
                window.getContainer(),
                customSidebar?.visible
                    ? (template.querySelector(
                          `#sidebar${parentUUID}`
                      ) as HTMLElement)
                    : undefined
            );
        });

    template
        .querySelector(`#buttonReset${parentUUID}`)
        ?.addEventListener("click", (ev: Event) => {
            ev.preventDefault();
            window.resetCamera();
        });

    stepper.signaler.addEventListener("update", ((ev: CustomEvent) => {
        template
            .querySelector(`#counter${parentUUID}`)
            ?.dispatchEvent(new CustomEvent("update", { detail: ev.detail }));
    }) as EventListener);

    return template;
};

export default Overlay;
