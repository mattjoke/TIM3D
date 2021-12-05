import { PerspectiveCamera, Vector3 } from "three";

const Camera = (perspective :number, defPosition: Vector3) => {
    const camera = new PerspectiveCamera(
        75,
        perspective,
        0.1,
        2000
    );

    camera.position.set(defPosition.x, defPosition.y, defPosition.z);
    return camera;
};

export default Camera;
