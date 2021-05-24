import {
    AmbientLight,
    ArrowHelper,
    Color,
    DoubleSide,
    GridHelper,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    PointLightHelper,
    Scene,
    SpotLight,
    SpotLightHelper,
    Vector3,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Box from "./geometry/Box";
import Line from "./geometry/Line";
import Plane from "./geometry/Plane";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import Loader from "./stuff/Loader";
import Init from "./Init";

new Init();

/*



const container = document.getElementById("container");
container.style.backgroundColor = "blue";
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

//Overlay and controls
let overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.width = "100%";
//Slider
let slider = document.createElement("input");
slider.type = "range";
slider.min = "0";
slider.max = "100";
slider.value = "50";
slider.step = "10";
slider.style.width = "80%";
slider.addEventListener("input", changePositon);
//Buttons
let buttonLeft = document.createElement("button");
buttonLeft.innerHTML = "<";
buttonLeft.addEventListener("click", (e: any) => {
    step(-1);
});
let buttonRight = document.createElement("button");
buttonRight.innerHTML = ">";
buttonRight.addEventListener("click", (e: any) => {
    step(1);
});

let mesh: Mesh;
function step(inc: number) {
    slider.value = String(Number(slider.value) + inc * 10);
    changePositon();
}
function changePositon() {
    cube.instance.position.x = (parseInt(slider.value) - 50) / 15;
}

overlay.appendChild(buttonLeft);
overlay.appendChild(slider);
overlay.appendChild(buttonRight);
container.appendChild(overlay);

new OrbitControls(camera, renderer.domElement);

const pointLight = new PointLight(0xff0000);
pointLight.intensity = 0.5;
pointLight.position.set(5, 5, 5);

const sphereSize = 1;
const pointLightHelper = new PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);
PointLightHelper;

const l = new AmbientLight(0xffffff);
scene.add(pointLight);

let json = {
    files: [{}],
    color: [""],
};
const load = Loader(json);

/*const loader = new STLLoader();
loader.load(
    "models/files/Base_top.stl",
    function (geometry) {
        const material = new MeshStandardMaterial({
            color: "blue",
            opacity: 0.5,
            flatShading: false,
            clipShadows: false,
            metalness: 0,
        });
        geometry.computeVertexNormals();
        mesh = new Mesh(geometry, material);
        mesh.scale.set(0.1, 0.1, 0.1);
        mesh.rotateX(-Math.PI / 2);

        scene.add(mesh);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
        console.log(error);
    }
);
camera.position.set(0, 0, 5);

const cube = new Box();
scene.add(cube.instance);

const line = new Line();
scene.add(line.instance);

const gridHelper = new Plane();
scene.add(gridHelper.instance);

let arrowHelper = new ArrowHelper(
    new Vector3(0, 1, 0),
    new Vector3(0, 0, 0),
    40,
    "green"
);
scene.add(arrowHelper);

arrowHelper = new ArrowHelper(
    new Vector3(1, 0, 0),
    new Vector3(0, 0, 0),
    40,
    "blue"
);
scene.add(arrowHelper);

arrowHelper = new ArrowHelper(
    new Vector3(0, 0, 1),
    new Vector3(0, 0, 0),
    40,
    "red"
);
scene.add(arrowHelper);

camera.position.z = 5;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

const light = new PointLight(0x00000, 1, 10);
light.position.set(3, 3, 3);
light.castShadow = true;
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    line.instance.rotation.y += 0.1;
    renderer.render(scene, camera);
}
animate();

const changeSizes = (event: any, size: number) => {
    gridHelper.instance;
    gridHelper.divisions = size;
};

document.body.addEventListener("click", (e) => changeSizes(e, 5));

console.log("Done");

*/
