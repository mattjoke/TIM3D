import { Color } from "three";

//TODO implement class type inference
export interface Extension {
    camera?: Function;
    controls?: Function;
    overlay?: Function;
    renderer?: Function;
    scene?: object;
}

type ShowSidebar = boolean | false;

export interface Sidebar {
    body?: HTMLElement;
    visible?: boolean;
}

export interface Colors {
    //Scene color
    backgroundColor?: Color | string;
    //Highlight color
    emissiveColor?: Color | string;
    //Selection color
    selectionColor?: Color | string;
}

export interface Config {
    colors?: Colors;
    world?: {
        startPosition?: [x: number, y: number, z: number];
        centerOfWorld?: [x: number, y: number, z: number];
    };
    //Instance container
    container?: HTMLElement;
    //Overlay div
    loadingOverlay?: HTMLElement;
    //Sidebar div
    sidebar?: {
        body?: HTMLElement;
        visible?: ShowSidebar;
    };

    animationLoop?: [string];

    extensions?: Extension;
}
