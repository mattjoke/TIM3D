import { Objects3D } from "../types/applicationTypes";
import { Config } from "@manualTypes/configTypes";
import { File } from "@manualTypes/jsonTypes";
import { Group, Mesh } from "three";
import Window from "../initialization/Window";
import LoaderOverlay from "./loaders/LoaderOverlay";
import LoaderManager from "./loaders/LoaderManager";
import Object3D from "./Object3D";

const Loader = async (
    files: File[],
    window: Window,
    config?: Config
): Promise<Objects3D> => {
    const div = config?.loadingOverlay ?? LoaderOverlay();
    div.style.zIndex = "100";
    window.container.appendChild(div);

    const items: Objects3D = new Map();

    const manager = LoaderManager();

    for (const file of files) {
        const loader = manager.getHandler(file.file);

        await loader?.loadAsync(file.file).then((object) => {
            let obj: Object3D;
            switch (object.type) {
                case "Group":
                    const o = object as Group;
                    const child = o.children[0] as Mesh;
                    obj = new Object3D(child.geometry, file);
                    obj.setScale(50,50,50);
                    break;
                default:
                    obj = new Object3D(object, file);
                    break;
            }

            obj.setOutlineColor(config?.colors?.selectionColor);

            items.set(file.name, obj);

            window.getScene().addObject(obj.getMesh());
            window.getScene().addObject(obj.getOutline());
        });
    }

    window.container.removeChild(div);

    return items;
};

export default Loader;
