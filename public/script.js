import "http://localhost:3000/bundle.js";

const json = {
    files: [
        {
            file: "models/files/Bar1.stl",
            color: "yellow",
            name: "1",
            pose: {
                position: [10, 10, 10]
            }
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
        }
    ],
    steps: [
        {
            name: "Init",
            positions: [
                {
                    name: "1",
                    position: [10, 10, 10],
                },
            ],
        },
        {
            name: "First Step",
            positions: [
                {
                    name: "1",
                    position: [0, 0, 0],
                    rotation: [0.3, 0.7, 0.4, 0.1],
                },
                {
                    name: "2",
                    position: [30, 10, 25]
                },
            ],
            animation: "x90deg"
        },
        {
            name: "Second Step",
            positions: [
                {
                    name: "1",
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
    container: document.getElementById("container"),
    colors: {
        backgroundColor: "rgb(",
    },
    shool: true,
    sidebar: {
        body: overlay,
    }
};

(async () => {
    const t1 = await new Factory(config).loadJSON(json);

    t1.on("5", "click", (e) => {
        const span = document.getElementById("data");
        if (span != null) {
            span.innerText = JSON.stringify(e.data);
        }
    });

    t1.on("1", "click", () => {
        t1.moveToStep(0);
    });

    t1.group("click", (e) => {
        // console.log(e.data);
    })

    t1.on("5", "hover", () => {
        // console.log("hovered!")
    })

    const btn = document.getElementById("jump");
    btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        t1.moveToStep(3);
    });
    t1.selectItem("1");
    console.log(t1.getAnimations());
})();


const json2 = {
    files: [
        {
            file: "models/files/screw.stl",
            color: "yellow",
            name: "1",
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
                    name: "1",
                    position: [0, 0, 0],
                },
            ],
        },
        {
            name: "First Step",
            positions: [
                {
                    name: "1",
                    position: [0, 10, 0],
                }
            ],
            animation: "y180deg"
        },
        {
            name: "Second Step",
            positions: [
                {
                    name: "1",
                    position: [0, -10, 0],
                }
            ],
            animation: "z360deg"
        }
    ],
};



(async () => {
    const c = {
        container: document.getElementById("second"),
        world: {
            startPosition: [50, 0, 0],
            centerOfWorld: [0, 10, 0]
        },
        animationLoop: ["Init", "First Step", "Second Step"]
    };

    await new Factory(c).loadJSON(json2);

})();

