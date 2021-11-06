import { Color } from "three";

export interface Config {
    container?: HTMLElement | null;
    enviroment?: {};
    overlay?: Element;
    movement?: {};
    color?: Color | string;
}
