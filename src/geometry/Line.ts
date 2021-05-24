import {
    BufferGeometry,
    LineBasicMaterial,
    Vector3,
    Line as Line3,
} from "three";

class Line {
    private material: LineBasicMaterial;
    private geometry: BufferGeometry;
    public instance: Line3;
    constructor() {
        this.material = new LineBasicMaterial({ color: 0x0000ff });
        const points = [];
        points.push(new Vector3(-2, 0, 0));
        points.push(new Vector3(0, 2, 0));
        points.push(new Vector3(2, 0, 0));

        this.geometry = new BufferGeometry().setFromPoints(points);
        this.instance = new Line3(this.geometry, this.material);
    }
}

export default Line;
