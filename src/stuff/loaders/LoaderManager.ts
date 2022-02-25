import { LoadingManager } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { PRWMLoader } from "three/examples/jsm/loaders/PRWMLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

const LoaderManager = () => {
    const manager = new LoadingManager();

    manager.addHandler(/\.gltf$/i, new GLTFLoader());
    manager.addHandler(/\.stl$/i, new STLLoader());
    manager.addHandler(/\.obj$/i, new OBJLoader());
    manager.addHandler(/\.prwm$/i, new PRWMLoader());
    manager.addHandler(/\.pcd$/i, new PCDLoader());
    return manager;
};

export default LoaderManager;
