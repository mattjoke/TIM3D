import { BufferGeometry, Color, Line, LineBasicMaterial, Vector3 } from "three";

const computeDivisions = (
    size: number,
    numberOfDivisions: number,
    direction: number[]
) => {
    const points = [];
    for (let i = 0; i < size; i += numberOfDivisions) {
        points.push(
            new Vector3(i * direction[0], i * direction[1], i * direction[2])
        );

        points.push(
            new Vector3(-i * direction[0], -i * direction[1], -i * direction[2])
        );
    }
    return points;
};

const Axis = (
    numOfDivisions: number,
    color: Color,
    direction: number[],
    size: number = 550
) => {
    const material = new LineBasicMaterial({
        color: color,
    });

    const lines = [
        new Vector3(
            -size * direction[0],
            -size * direction[1],
            -size * direction[2]
        ),
        new Vector3(
            size * direction[0],
            size * direction[1],
            size * direction[2]
        ),
    ];

    const geometry = new BufferGeometry().setFromPoints(lines);

    const line = new Line(geometry, material);
    
    /*
    const points = computeDivisions(size, numOfDivisions, direction) ?? 0;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        const dir = {
            x: direction[2],
            z: direction[1],
            y: direction[0],
        };

        const limit = 10;
        const down = new Vector3(
            point.x - dir.x * limit,
            point.y - dir.y * limit,
            point.z - dir.z * limit
        );
        const up = new Vector3(
            point.x + dir.x * limit,
            point.y + dir.y * limit,
            point.z + dir.z * limit
        );
        const geo = new BufferGeometry().setFromPoints([point, up, down]);

        line.add(
            new Line(
                geo,
                new LineBasicMaterial({
                    color: "black",
                })
            )
        );

        line.rotateX(0.3 * dir.x);
        line.rotateY(0.3 * dir.y);
        line.rotateZ(0.3 * dir.z);
    }*/

    return line;
};

export default Axis;
