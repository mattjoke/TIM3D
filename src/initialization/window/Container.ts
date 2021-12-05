class WindowsContainer {
    private instance: HTMLElement;
    constructor(container?: HTMLElement) {
        if (container == null) {
            this.instance = document.createElement("div");
            this.instance.id = "container";
            document.body.appendChild(this.instance);
            console.warn("Container not specified! Using default one");
        } else {
            this.instance = container;
        }

        this.instance.style.backgroundColor = "blue";
        this.instance.style.position = "relative";
    }
    public getInstance() {
        return this.instance;
    }
    public getSizing() {
        return {
            width: this.instance.offsetWidth,
            height: this.instance.offsetHeight,
        };
    }

    public appendChild(domElement: HTMLElement) {
        this.instance.appendChild(domElement);
    }

    public removeChild(domElement: HTMLElement) {
        this.instance.removeChild(domElement);
    }
}

export default WindowsContainer;
