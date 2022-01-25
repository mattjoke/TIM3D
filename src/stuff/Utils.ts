import { ObjectID } from "@manualTypes/applicationTypes";

const isColor = (strColor: string) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
};

const parseExtension = (filename: ObjectID) => {
    return filename.toString().split(".").pop();
};

// TS igonre for Typescript unknown functions
const checkFullscreen = (document?: Document) => {
    if (document == null){
        return false;
    } 
    return document.fullscreenElement || 
        //@ts-ignore
        document.webkitIsFullscreen || //Webkit browsers
        //@ts-ignore
        document.mozFullScreen || // Firefox
        //@ts-ignore
        document.msFullscreenElement !== undefined // IE
};

export { isColor, parseExtension, checkFullscreen };
