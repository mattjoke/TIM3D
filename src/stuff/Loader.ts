import { Objects3D } from "@manualTypes/applicationTypes";
import { File } from "@manualTypes/jsonTypes";
import { BufferGeometry } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import Window from "../initialization/Window";
import Container from "../initialization/window/Container";
import LoaderOverlay from "./LoaderOverlay";
import Object3D from "./Object3D";

const Loader = async (
    files: File[],
    container: Container,
    window: Window
): Promise<Objects3D> => {
    const div = LoaderOverlay(container);
    const items: Objects3D = new Map();
    for (const file of files) {
        const loader = new STLLoader();
        await loader
            .loadAsync(file.file)
            .then((geometry: BufferGeometry) => {
                const obj = new Object3D(geometry, file);

                items.set(file.name, obj);

                window.getScene().addObject(obj.getMesh());
                window.getScene().addObject(obj.getOutline());
            })
            .catch((error) => {
                console.error(error);
            });
    }

    container.removeChild(div);

    return items;
};

export default Loader;
