import {
    AxesHelper,
    BufferGeometry,
    Color,
    Line,
    LineBasicMaterial,
    Vector3,
} from "three";
import Init from "../Init";

class Axis {
    private numberOfDivisions: number;
    private direction: Array<number>;
    private size: number = 50;
    constructor(
        numOfDivisions: number,
        color: Color,
        dir: Array<number>,
        size: number = 50
    ) {
        const material = new LineBasicMaterial({
            color: color,
        });

        this.numberOfDivisions = numOfDivisions;
        this.size = size;
        this.direction = dir;

        const points = this.computeDivisions();
        points.push(
            new Vector3(-size * dir[0], -size * dir[1], -size * dir[2])
        );
        points.push(new Vector3(size * dir[0], size * dir[1], size * dir[2]));

        const geometry = new BufferGeometry().setFromPoints(points);

        const line = new Line(geometry, material);
        Init.window.addObject(line);
    }

    computeDivisions() {
        let divisions = Math.round(this.size / this.numberOfDivisions);
        let current = new Vector3(0, 0, 0);

        let points: Array<Vector3> = [];
        for (let i = 0; i < divisions; i++) {
            current = new Vector3(
                (current.x + divisions) * this.direction[0],
                (current.x + divisions) * this.direction[1],
                (current.x + divisions) * this.direction[2]
            );

            points.push();
        }
        return points;
    }
}

export default Axis;
