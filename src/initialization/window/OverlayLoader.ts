import { Sidebar } from "@manualTypes/configTypes";
import Stepper from "initialization/Stepper";
import Window from "initialization/Window";

const overlay = require("../../statics/overlay/overlay.hbs");

const Loader = (stepper: Stepper, window: Window, sidebar?: Sidebar) => {
    const out = overlay({ stepper: stepper });
    console.log(out);
    return out;
};

export { Loader as OverlayLoader };
