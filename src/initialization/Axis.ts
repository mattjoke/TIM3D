import { BufferGeometry, Color, Line, LineBasicMaterial, Vector3 } from "three";

const computeDivisions = (
    size: number,
    numberOfDivisions: number,
    direction: Array<number>
) => {
    let divisions = Math.round(size / numberOfDivisions);
    let current = new Vector3(0, 0, 0);

    let points: Array<Vector3> = [];
    for (let i = 0; i < divisions; i++) {
        current = new Vector3(
            (current.x + divisions) * direction[0],
            (current.x + divisions) * direction[1],
            (current.x + divisions) * direction[2]
        );

        points.push();
    }
    return points;
};

const Axis = (
    numOfDivisions: number,
    color: Color,
    direction: Array<number>,
    size: number = 50
) => {
    const material = new LineBasicMaterial({
        color: color,
    });

    const points = computeDivisions(size, numOfDivisions, direction);
    points.push(
        new Vector3(
            -size * direction[0],
            -size * direction[1],
            -size * direction[2]
        )
    );
    points.push(
        new Vector3(
            size * direction[0],
            size * direction[1],
            size * direction[2]
        )
    );

    const geometry = new BufferGeometry().setFromPoints(points);

    const line = new Line(geometry, material);
    return line;
};

export default Axis;
