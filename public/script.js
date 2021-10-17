import * as Three3D from "http://localhost:3000/scripts/bundle.js"

console.log(Three3D);

const btn = document.getElementById("jump");
btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    console.log("KLIK!");
});
