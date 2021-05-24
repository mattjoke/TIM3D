import { GridHelper } from "three";

class Plane {
    public size = 100;
    public divisions = 100;
    public instance: GridHelper;
    constructor() {
        this.instance = new GridHelper(this.size, this.divisions);
    }
}

export default Plane;
