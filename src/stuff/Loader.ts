import { Mesh, MeshStandardMaterial } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import Init from "../Init";

const Loader = (json: any) => {
    console.log(json);
    json.files.forEach((file: any) => {
        const loader = new STLLoader();
        loader.load(
            file.file,
            function (geometry) {
                const material = new MeshStandardMaterial({
                    color: file.color,
                    opacity: 0.5,
                    flatShading: false,
                    clipShadows: false,
                    metalness: 0,
                });
                geometry.computeVertexNormals();
                const mesh = new Mesh(geometry, material);
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.position.set(
                    Math.random() * 50 - Math.random() * 25,
                    0,
                    Math.random() * 50 - Math.random() * 25
                );
                mesh.rotateX(-Math.PI / 2);

                Init.window.addObject(mesh);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.log(error);
            }
        );
    });
};

export default Loader;
