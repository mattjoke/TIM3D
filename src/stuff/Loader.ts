import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import Init from "../Init";
import { File } from "../types/jsonTypes";

const Loader = async (files: File[]) => {
    let items = new Map<string | number, Mesh>();
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
            mesh.position.set(0, 0, 0);
            mesh.rotateX(-Math.PI / 2);

            items.set(file.name, mesh);

            Init.window.addObject(mesh);
        });
    }
    return items;
};

export default Loader;
