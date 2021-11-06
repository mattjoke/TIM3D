import "../statics/loader.css";

const LoaderOverlay = (container: HTMLElement) => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.innerText = "Loading...";

    div.innerHTML =
        '<div class="loader-container"><div class="loader">Loading...</div></div>';
    div.style.zIndex = "100";

    div.style.pointerEvents = "none";
    div.style.top = "0";
    div.style.width = "inherit";
    div.style.height = "inherit";
    div.style.backgroundColor = "white";

    container.appendChild(div);
    return div;
};

export default LoaderOverlay;
