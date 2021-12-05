import { Color } from "three";

//TODO implement class type inference
export interface Extension {
    camera?: Function,
    controls?: Function,
    overlay?: Function,
    renderer?: Function,
    scene?: Function,
}


type ShowSidebar = false;

export interface Config {
    //Scene color
    backgroundColor?:  Color | string;
    emissiveColor?: Color | string;
    //Instance container
    container?: HTMLElement;
    //Overlay div
    loadingOverlay?: HTMLElement;
    //Sidebar div
    sidebar?: HTMLElement;
    sidebarShown: ShowSidebar;
    extensions?: Extension;
}
