import { Vector3 } from "three";
import Init from "./Init";
import { Config } from "./types/configTypes";
import { JSON } from "./types/jsonTypes";


const json: JSON = {
    files: [
        {
            file: "models/files/Bar1.stl",
            color: "yellow",
            name: "1",
        },
        {
            file: "models/files/Bar2.stl",
            color: "orange",
            name: "2",
        },
        {
            file: "models/files/Bar3.stl",
            color: "#192833",
            name: "3",
        },
        {
            file: "models/files/Bar4.stl",
            name: "4",
        },
        {
            file: "models/files/Base_gr.stl",
            name: "5",
        },
        {
            file: "models/files/Base_top.stl",
            name: "6",
        },
        {
            file: "models/files/Bolt_slide_gr.stl",
            name: "7",
        },
        {
            file: "models/files/Bolt_slide_top.stl",
            name: "8",
        },
    ],
    steps: [
        {
            name: "Init",
            positions: [
                {
                    name: "1",
                    position: new Vector3(10, 10, 10),
                },
            ],
        },
        {
            name: "First Step",
            positions: [
                {
                    name: "1",
                    position: new Vector3(7, 7, 7),
                },
            ],
        },
        {
            name: "Second Step",
            positions: [
                {
                    name: "1",
                    position: new Vector3(5, 10, 10),
                },
            ],
        },
    ],
};

const json2: JSON = {
    files: [
        {
            file: "models/files/Bar1.stl",
            color: "yellow",
            name: "1",
        },
        {
            file: "models/files/Bar2.stl",
            color: "orange",
            name: "2",
        },
        {
            file: "models/files/Bar3.stl",
            color: "#192833",
            name: "3",
        },
    ],
    steps: [
        {
            name: "Init",
            positions: [
                {
                    name: "1",
                    position: new Vector3(10, 10, 10),
                },
            ],
        },
        {
            name: "Second Step",
            positions: [
                {
                    name: "1",
                    position: new Vector3(5, 10, 10),
                },
            ],
        },
    ],
};

const config: Config = {
    container: document.getElementById("container"),
};

const t1 = new Init(config);
t1.whithJSON(json);

const config2: Config = {
    container: document.getElementById("second"),
};

const t2 = new Init(config2);
t2.whithJSON(json2);

const t3 = new Init({ container: document.getElementById("third") });

console.log(t1, t2, t3);
