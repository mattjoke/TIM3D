import { BufferGeometry } from "three";
import { File } from "@manualTypes/jsonTypes";
import LoaderOverlay from "./LoaderOverlay";
import Object3D from "./Object3D";
import { Objects3D } from "@manualTypes/applicationTypes";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import Window from "../initialization/Window";

const Loader = async (
    files: File[],
    container: HTMLElement,
    window: Window
): Promise<Objects3D> => {
    const div = LoaderOverlay(container);
    const items: Objects3D = new Map();
    for (const file of files) {
        const loader = new STLLoader();
        await loader.loadAsync(file.file).then((geometry: BufferGeometry) => {
            const obj = new Object3D(geometry, file);

            items.set(file.name, obj);

            window.addObject(obj.getMesh());
            window.addObject(obj.getOutline());
        });
    }

    container.removeChild(div);

    return items;
};

export default Loader;
