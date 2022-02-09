import "./scripts/bundle.js";

const json = {
    files: [
        {
            file: "models/files/Bar1.stl",
            color: "yellow",
            id: "1",
            pose: {
                position: [10, 10, 10]
            }
        },
        {
            file: "models/files/Bar2.stl",
            color: "orange",
            id: "2",
        },
        {
            file: "models/files/Bar3.stl",
            color: "#192833",
            id: "3",
        },
        {
            file: "models/files/Bar4.stl",
            id: "4",
        },
        {
            file: "models/files/Base_gr.stl",
            id: "5",
        },
        {
            file: "models/files/Base_top.stl",
            id: "6",
        },
        {
            file: "models/files/Bolt_slide_gr.stl",
            id: "7",
        },
        {
            file: "models/files/Bolt_slide_top.stl",
            id: "8",
        },
        {
            file: "models/files/cube.obj",
            id: "9"
        }
    ],
    steps: [
        {
            name: "Init",
            positions: [
                {
                    id: "1",
                    position: [10, 10, 10],
                },
            ],
        },
        {
            name: "First Step",
            positions: [
                {
                    id: "1",
                    position: [0, 0, 0],
                    rotation: [0.3, 0.7, 0.4, 0.1],
                },
                {
                    id: "2",
                    position: [30, 10, 25],
                    animation: "z360deg"
                },
            ],
        },
        {
            name: "Second Step",
            positions: [
                {
                    id: "1",
                    position: [20, 15, 7],
                },
            ],
            animation: "y90deg"
        },
    ],
};

var overlay = document.createElement("div");
overlay.innerHTML = "<p>LOADING</p>";

const config = {
    container: document.getElementById("first"),
    colors: {
        backgroundColor: "rgb(",
    },
    sidebar: {
        body: overlay,
        visible: true
    },
};

const t1 = new Factory(config).loadJSON(json);

t1.on("5", "click", (e) => {
    const span = document.getElementById("data");
    if (span != null) {
        span.innerText = JSON.stringify(e.data);
    }
});

t1.on("1", "click", () => {
});

t1.group("click", (e) => {
    // console.log(e.data);
    //t1.destroy();
    console.log("KLIKD")
})

t1.on("5", "hover", (e) => {
    /*obj.getMesh().position.x += 5;
    obj.getOutline().position.x += 5*/
    console.log(e)
})

const btn = document.getElementById("jump");
btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    t1.moveToStep(3);
});
t1.getItem("1");


const json2 = {
    files: [
        {
            file: "models/files/screw.stl",
            color: "yellow",
            id: "1",
            pose: {
                position: [0, 0, 0]
            }
        }
    ],
    steps: [
        {
            name: "Init",
            positions: [
                {
                    id: "1",
                    position: [0, 0, 0],
                },
            ],
        },
        {
            name: "First Step",
            positions: [
                {
                    id: "1",
                    position: [0, 10, 0],
                }
            ],
            animation: "y180deg"
        },
        {
            name: "Second Step",
            positions: [
                {
                    id: "1",
                    position: [0, -10, 0],
                }
            ],
            animation: "x360deg"
        }
    ],
};



const c = {
    container: document.getElementById("second"),
    world: {
        startPosition: [50, 0, 0],
        centerOfWorld: [0, -25, 0]
    },
    animationLoop: ["Init", "First Step", "Second Step"]
};

const f = new Factory(c).loadJSON(json2);

f.on("1", "hover", (ev) => {
    console.log("Inside!")
    console.log(ev)
})
