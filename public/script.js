import "http://localhost:3000/bundle.js";

const json = {
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
                    rotation: [0.3, 0.7, 0.4],
                },
            ],
        },
        {
            name: "Second Step",
            positions: [
                {
                    name: "1",
                    position: [20, 15, 7],
                },
            ],
        },
    ],
};

const config = {
    container: document.getElementById("container"),
    color: "orange",
    shool:true
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
        console.log(e.data);
    })

    const btn = document.getElementById("jump");
    btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        t1.moveToStep(3);
    });
})();