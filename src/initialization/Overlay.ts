import { GridHelper } from "three";
import Init from "../Init";



const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      Init.window.container.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

const Overlay = () => {

    let overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.pointerEvents = 'none';
    overlay.style.top = "0";
    overlay.style.width = "inherit";
    overlay.style.height = "inherit"
    //Slider
    let slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.value = "50";
    slider.step = "10";
    slider.style.width = "90%";
    slider.style.pointerEvents='auto';
    function step(inc: number) {
        slider.value = String(Number(slider.value) + inc * 10);
    }
    //Buttons
    let buttonLeft = document.createElement("button");
    buttonLeft.innerHTML = "<";
    buttonLeft.style.pointerEvents='auto';
    buttonLeft.addEventListener("click", (e: any) => {
        step(-1);
    });
    let buttonRight = document.createElement("button");
    buttonRight.innerHTML = ">";
    buttonRight.style.pointerEvents='auto';
    buttonRight.addEventListener("click", (e: any) => {
        step(1);

    });


    overlay.appendChild(buttonLeft);
    overlay.appendChild(slider);
    overlay.appendChild(buttonRight);

    let fullscreen = document.createElement("button");
    fullscreen.innerHTML = "🔎";
    fullscreen.style.position = 'absolute'
    fullscreen.style.bottom = "0";
    fullscreen.style.right = "0";
    fullscreen.style.pointerEvents = "auto";
    fullscreen.addEventListener("click", (e:Event)=>{
        toggleFullscreen();
    });
    
    


    overlay.appendChild(fullscreen);
    console.log("Overlay instantiated")
    return overlay;
}

export default Overlay;
