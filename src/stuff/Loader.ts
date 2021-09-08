import {  BackSide, BufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import LoaderOverlay from "./LoaderOverlay";
import { File } from "../types/jsonTypes";
import Window from "../initialization/Window";

const Loader = async (
    files: File[],
    container: HTMLElement,
    window: Window
) => {
    const div = LoaderOverlay(container);
    const items = new Map<string | number, Mesh>();
    for (const file of files) {
        const loader = new STLLoader();
        await loader.loadAsync(file.file).then((geometry: BufferGeometry) => {
            const material = new MeshStandardMaterial({
                name: file.name.toString(),
                color: file.color || "white",
                opacity: 0.5,
                flatShading: false,
                clipShadows: false,
                metalness: 0,
            });
            geometry.computeVertexNormals();
            const mesh = new Mesh(geometry, material);
            mesh.scale.set(0.1, 0.1, 0.1);
            mesh.position.set(Math.floor(Math.random()*-100+50), 0, 0);
            mesh.rotateX(-Math.PI / 2);
            mesh.name = file.name.toString();



           const outline = new MeshBasicMaterial({
                color: "blue",
                side: BackSide,
            });
            const selected = new Mesh(geometry, outline);
            selected.name = `${file.name.toString()}-outline`;
            selected.position.set(mesh.position.x,
                mesh.position.y,
                mesh.position.z
            );
            selected.rotation.set(
                mesh.rotation.x,
                mesh.rotation.y,
                mesh.rotation.z
            );
            selected.scale.multiplyScalar(0.11);
            selected.layers.set(1);

            items.set(file.name, mesh);
            items.set(`${file.name}-outline`, selected);

            window.addObject(mesh);
            window.addObject(selected);
        });
    }

    container.removeChild(div);

    return items;
};

export default Loader;
