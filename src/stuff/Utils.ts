import { ObjectID } from "@manualTypes/applicationTypes";


const isColor = (strColor: string) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
};

const parseExtension = (filename: ObjectID)=>{
    return filename.toString().split('.').pop()
}


export {
    isColor,
    parseExtension
}