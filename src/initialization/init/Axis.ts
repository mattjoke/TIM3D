import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";

const constructAxis = (
    color: string,
    dirArr: number[],
    scaling: number = 1
) => {
    const size = 550 * scaling;
    const material = new LineBasicMaterial({ color: color });
    const lines = [
        new Vector3(-size * dirArr[0], -size * dirArr[1], -size * dirArr[2]),
        new Vector3(size * dirArr[0], size * dirArr[1], size * dirArr[2]),
    ];

    const geometry = new BufferGeometry().setFromPoints(lines);

    return new Line(geometry, material);
};

const Axis = (scaling: number) => {
    const xAxis = constructAxis("blue", [1, 0, 0], scaling);
    const yAxis = constructAxis("red", [0, 0, 1], scaling);
    const zAxis = constructAxis("green", [0, 1, 0], scaling);

    return [xAxis, yAxis, zAxis];
};

export default Axis;
